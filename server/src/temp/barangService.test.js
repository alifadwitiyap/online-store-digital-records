const barangService = require('../service/barangService');
require('dotenv').config({ path: "../../.env" })


const service = new barangService

testInputBarangBaru = async () => {
    service.inputBarangBaru(
        {
            tanggal: "2022-04-22",
            id_barang: 'test-1',
            nama: 'kemero',
            harga_beli: 20000,
            supplier: "sirada",
            jumlah_dibeli: 5
        }
    )

}

testInputPenjualan = async () => {
    service.inputBarangTerjual(
        {
            tanggal: "2022-04-22",
            id_barang: 'test-1',
            nama: 'kemero',
            harga_jual: 20000,
            jumlah_dijual: 5
        }
    )

}

testGetAllPenjualanBarangByDate = async (tanggal_awal, tanggal_akhir) => {
    const res = await service.getAllPenjualanBarangByDate({ tanggal_awal, tanggal_akhir })
    console.log("🚀 ~ file: barangService.test.js ~ line 34 ~ testGetAllPenjualanBarangByDate= ~ res\n", res)
}

testGetAllPembelianBarangByDate = async (tanggal_awal, tanggal_akhir) => {
    const res = await service.getAllPembelianBarangByDate({ tanggal_awal, tanggal_akhir })
    console.log("🚀 ~ file: barangService.test.js ~ line 39 ~ testGetAllPembelianBarangByDate= ~ res", res)
}

testGetAllStocks = async () => {
    const res = await service.getAllStocks()
    console.log("🚀 ~ file: barangService.test.js ~ line 34 ~ testGetAllStocks= ~ res\n", res)
}

testUpdateStockById = async () => {
    const id_barang = "test-1"
    const nama = "updated"
    const supplier = "updated"

    await service.updateStockById({ id_barang }, { nama, supplier })
}
testDeleteStockById = async () => {
    const id_barang = "test-1"

    await service.deleteStockById({ id_barang })
}



testDeleteStockById()