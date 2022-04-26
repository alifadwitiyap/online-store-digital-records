const barangService = require('../service/barangService');
const catchError = require('../middleware/catchError');
require('dotenv').config()

//TODO implement service barangHandler
class barangHandler {
    constructor() {
        this._service = new barangService()

        // make promise to send err to next and binding "this"
        this.postInputBarang = catchError(this.postInputBarang.bind(this));
        this.postInputPenjualan = catchError(this.postInputPenjualan.bind(this));
        this.postBiayaOperasional = catchError(this.postBiayaOperasional.bind(this));
        this.getAllPenjualanBarangByDate = catchError(this.getAllPenjualanBarangByDate.bind(this));
    }

    // @desc handle input barang baru dan menginputkannya ke history pembelian
    // @route POST /barang/inputBarang
    async postInputBarang(req, res, next) {
        const id_barang = await this._service.inputBarangBaru(req.body)

        res.status(201).json({
            isSuccess: true,
            "id_barang": id_barang
        })
    }

    async postInputPenjualan(req, res, next) {
        await this._service.inputBarangTerjual(req.body)

        res.status(201).json({
            isSuccess: true,
            msg: "history barang terjual berhasil ditambahkan"
        })
    }

    async postBiayaOperasional(req, res, next) {
        await this._service.inputBiayaOperasional(req.body)

        res.status(201).json({
            isSuccess: true,
            msg: "biaya operasional berhasil ditambahkan"
        })
    }


    async getAllPenjualanBarangByDate(req, res, next) {
        let data = await this._service.getAllPenjualanBarangByDate(req.query)
        data = data.map((obj) => {
            obj.tanggal_jual = obj.tanggal_jual.toLocaleDateString('fr-CA')
            return obj
        })

        res.status(200).json({
            isSuccess: true,
            data: data
        })
    }


}

module.exports = barangHandler