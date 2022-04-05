const { Pool } = require('pg')
const { nanoid } = require('nanoid');
require('dotenv').config({ path: "../../.env" })



class barangService {
    constructor(){
        this._pool =new Pool({
            connectionString:process.env.DATABASE_URL
        })
    }

    async inputPembelianBarangBaru({tanggal,id_barang,nama,harga_beli,supplier,jumlah_dibeli}){
        if (jumlah_dibeli <0){
            throw new Error('pembelian tidak boleh negatif')
        }
        //incase gak ada

        if (!this.barangIsExist(id_barang)){
            let query = {
                text: 'INSERT INTO barang VALUES($1, $2, $3, $4)',
                values: [id_barang, nama, supplier, 0],
            };
            
            await this._pool.query(query);
        }
        
        
        //tambah pembelian
        const id_pembelian = `pembelian-${nanoid(16)}`
        
        const tambahPembelianQuery = {
            text: 'INSERT INTO pembelian_barang VALUES($1, $2, $3, $4, $5) ',
            values: [id_pembelian, id_barang, harga_beli, jumlah_dibeli,tanggal],
        };
        
        await this._pool.query(tambahPembelianQuery);
        
        
        const updatedJmlBarang= await this.checkJumlahBarang(id_barang)+jumlah_dibeli
        //update jumlah barangnya
        console.log(updatedJmlBarang);
        const  updateBarangQuery = {
            text: 'UPDATE barang SET jumlah = $1 WHERE id_barang = $2 ',
            values: [updatedJmlBarang,id_barang],
        };
        
        await this._pool.query(updateBarangQuery);
    }


    async inputBarangTerjual({tanggal,id_barang,jumlah_dijual,harga_jual}){
        if (jumlah_dijual <0){
            throw new Error('penjualan tidak boleh negatif')
        }

        if (!this.barangIsExist(id_barang)){
            throw new Error('id barang tidak ditemukan');
        }

        const id_penjualan = `penjualan-${nanoid(16)}`

        const tambahPenjualanQuery = {
            text: 'INSERT INTO pembelian_barang VALUES($1, $2, $3, $4, $5) ',
            values: [id_penjualan, id_barang, harga_jual, jumlah_dijual,tanggal],
        };

        await this._pool.query(tambahPenjualanQuery);

        const updatedJmlBarang= await this.checkJumlahBarang(id_barang)-jumlah_dijual
        console.log(updatedJmlBarang);

        if (updatedJmlBarang<0){
            throw new Error('jumlah barang tidak mencukupi');
        }

        const  updateBarangQuery = {
            text: 'UPDATE barang SET jumlah = $1 WHERE id_barang = $2 ',
            values: [updatedJmlBarang,id_barang],
        };

        await this._pool.query(updateBarangQuery);
    }

    


    //utility
    async barangIsExist(id_barang){
        const query = {
            text: 'SELECT id_barang FROM barang WHERE id_barang = $1',
            values: [id_barang],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            return false
        }

        return true
    }

    async checkJumlahBarang(id_barang){
        const query = {
            text: 'SELECT jumlah FROM barang WHERE id_barang = $1',
            values: [id_barang],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            return 0
        }

        return result.rows[0].jumlah

    }


}



percobaan = async () => {
    const tes= new barangService()

    const res=  await tes.inputBarangTerjual({tanggal:'2017-3-14',
                    id_barang:"tes1",
                    harga_jual:10000,
                    jumlah_dijual:39})

    console.log(res);

}

percobaan()