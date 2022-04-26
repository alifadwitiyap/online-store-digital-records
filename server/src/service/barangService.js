const { Pool } = require('pg')
const { nanoid } = require('nanoid');
const errorResponse = require('../util/errorResponse');

class barangService {

    constructor() {
        this._pool = new Pool({
            connectionString: process.env.DATABASE_URL
        })
    }

    async inputBarangBaru({ tanggal, id_barang, nama, harga_beli, supplier, jumlah_dibeli }) {
        if (! await this.IsBarangExist(id_barang)) {
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
            values: [id_pembelian, id_barang, harga_beli, jumlah_dibeli, tanggal],
        };
        await this._pool.query(tambahPembelianQuery);

        //update jumlah barang
        const updatedJmlBarang = await this.checkJumlahBarang(id_barang) + jumlah_dibeli
        const updateBarangQuery = {
            text: 'UPDATE barang SET jumlah = $1 WHERE id_barang = $2 RETURNING id_barang',
            values: [updatedJmlBarang, id_barang],
        };
        const result = await this._pool.query(updateBarangQuery);

        return result.rows[0].id_barang
    }


    async inputBarangTerjual({ tanggal, id_barang, jumlah_dijual, harga_jual }) {
        if (!this.IsBarangExist(id_barang)) {
            throw new errorResponse('id barang tidak ditemukan, tidak dapat menjual barang yang kosong', 404)
        }

        const updatedJmlBarang = await this.checkJumlahBarang(id_barang) - jumlah_dijual
        if (updatedJmlBarang < 0) {
            throw new errorResponse('jumlah barang tidak mencukupi', 400)
        }

        const id_penjualan = `penjualan-${nanoid(16)}`
        const tambahPenjualanQuery = {
            text: 'INSERT INTO penjualan_barang VALUES($1, $2, $3, $4, $5) ',
            values: [id_penjualan, id_barang, harga_jual, jumlah_dijual, tanggal],
        };
        await this._pool.query(tambahPenjualanQuery);


        const updateBarangQuery = {
            text: 'UPDATE barang SET jumlah = $1 WHERE id_barang = $2 ',
            values: [updatedJmlBarang, id_barang],
        };
        await this._pool.query(updateBarangQuery);
    }


    async inputBiayaOperasional({ tanggal, jenis, total_biaya }) {
        if (total_biaya < 0) {
            throw new errorResponse('biaya tidak boleh negatif', 400)
        }

        const id_biaya = `operasional-${nanoid(16)}`
        const query = {
            text: 'INSERT INTO biaya_operasional VALUES($1, $2, $3, $4) ',
            values: [id_biaya, jenis, total_biaya, tanggal],
        };
        await this._pool.query(query);

    }

    async getAllPembelianBarangByDate({ tanggal_awal, tanggal_akhir }) {
        const query = {
            text: 'SELECT * FROM pembelian_barang WHERE tanggal_beli BETWEEN $1 AND $2',
            values: [tanggal_awal, tanggal_akhir],
        };
        const result = await this._pool.query(query);

        return result.rows
    }

    async getAllPenjualanBarangByDate({ tanggal_awal, tanggal_akhir }) {
        const query = {
            text: 'SELECT * FROM penjualan_barang WHERE tanggal_jual BETWEEN $1 AND $2',
            values: [tanggal_awal, tanggal_akhir],
        };
        const result = await this._pool.query(query);

        return result.rows
    }

    async getAllBiayaOperasionalByDate({ tanggal_awal, tanggal_akhir }) {
        const query = {
            text: 'SELECT * FROM biaya_operasional WHERE tanggal_biaya BETWEEN $1 AND $2',
            values: [tanggal_awal, tanggal_akhir],
        };
        const result = await this._pool.query(query);

        return result.rows
    }

    async getAllStocks() {
        const query = {
            text: 'SELECT * FROM barang'
        };
        const result = await this._pool.query(query);

        return result.rows
    }

    async updateStockById({ id_barang }, { nama, supplier }) {
        const query = {
            text: 'UPDATE barang SET nama=$1, supplier=$2 WHERE id_barang = $3 RETURNING id_barang',
            values: [nama, supplier, id_barang],
        };
        const result = await this._pool.query(query);

        if (result.rows.length < 1) {
            throw new errorResponse('id barang tidak ditemukan', 404)
        }
    }

    async deleteStockById({ id_barang }) {
        const query = {
            text: 'DELETE FROM barang WHERE id_barang=$1 RETURNING id_barang',
            values: [id_barang],
        };
        const result = await this._pool.query(query);

        if (result.rows < 1) {
            throw new errorResponse('id tidak ditemukan', 404)
        }
    }




    // ========================================================================== //
    // 
    //utility

    async IsBarangExist(id_barang) {
        const query = {
            text: 'SELECT id_barang FROM barang WHERE id_barang = $1',
            values: [id_barang],
        };
        const result = await this._pool.query(query);

        if (result.rows.length < 1) {
            return false
        }

        return true
    }

    async checkJumlahBarang(id_barang) {
        const query = {
            text: 'SELECT jumlah FROM barang WHERE id_barang = $1',
            values: [id_barang],
        };
        const result = await this._pool.query(query);

        if (result.rows.length < 1) {
            return 0
        }

        return result.rows[0].jumlah
    }


}

module.exports = barangService