const BarangService = require("../service/BarangService");
const errorCatcher = require("../middleware/errorCatcher");

require("dotenv").config();

class BarangHandler {
	constructor() {
		this._service = new BarangService();

		// Make promise to send err to next and binding "this"
		this.postInputBarang = errorCatcher(this.postInputBarang.bind(this));
		this.postInputPenjualan = errorCatcher(this.postInputPenjualan.bind(this));
		this.postBiayaOperasional = errorCatcher(this.postBiayaOperasional.bind(this));
		this.getAllPenjualanBarangByDate = errorCatcher(this.getAllPenjualanBarangByDate.bind(this));
		this.getAllStocks = errorCatcher(this.getAllStocks.bind(this));
		this.updateStockById = errorCatcher(this.updateStockById.bind(this));
		this.deleteStockById = errorCatcher(this.deleteStockById.bind(this));
	}

	// @desc handle input barang baru / menambahkan stock menginputkannya ke history pembelian
	// @route POST /barang/stock
	async postInputBarang(req, res) {
		const id_barang = await this._service.inputBarangBaru(req.body);

		res.status(201).json({
			isSuccess: true,
			id_barang
		});
	}

	// @desc handle untuk mengurangi barang kemudian menambahkan history penjualan
	// @route POST /barang/Penjualan
	async postInputPenjualan(req, res) {
		await this._service.inputBarangTerjual(req.body);

		res.status(201).json({
			isSuccess: true,
			message: "history barang terjual berhasil ditambahkan"
		});
	}

	// @desc handle untuk mengurangi barang kemudian menambahkan history penjualan
	// @route POST /barang/Penjualan
	async postBiayaOperasional(req, res) {
		await this._service.inputBiayaOperasional(req.body);

		res.status(201).json({
			isSuccess: true,
			message: "biaya operasional berhasil ditambahkan"
		});
	}

	async getAllPenjualanBarangByDate(req, res) {
		let data = await this._service.getAllPenjualanBarangByDate(req.query);
		let totalPenjualan = 0;
		data = data.map((obj) => {
			obj.tanggal_jual = obj.tanggal_jual.toLocaleDateString("fr-CA");
			totalPenjualan = totalPenjualan + obj.harga_penjualan;
			return obj;
		});

		res.status(200).json({
			isSuccess: true,
			totalPenjualan,
			data
		});
	}

	async getAllStocks(req, res) {
		const data = await this._service.getAllStocks(req.query);
		res.status(200).json({
			isSuccess: true,
			data
		});
	}

	async updateStockById(req, res) {
		await this._service.updateStockById(req.params, req.body);
		res.status(200).json({
			isSuccess: true,
			message: "Stock berhasil di update"
		});
	}

	async deleteStockById(req, res) {
		await this._service.deleteStockById(req.params);
		res.status(200).json({
			isSuccess: true,
			message: "Stock berhasil di delete"
		});
	}
}

module.exports = BarangHandler;
