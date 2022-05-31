const laporanService = require("../service/laporanService");
const errorCatcher = require("../middleware/errorCatcher");
require("dotenv").config();

class laporanHandler {
	constructor() {
		this._service = new laporanService();

		// make promise to send err to next and binding "this"
		this.keuntunganPenjualanKotorHandler = errorCatcher(this.keuntunganPenjualanKotorHandler.bind(this));
		this.kentunganPenjualanBersihHandler = errorCatcher(this.kentunganPenjualanBersihHandler.bind(this));
	}

	async kentunganPenjualanBersihHandler(req, res) {
		let [PenjualanKotor, dataBiayaOperasional, dataPembelian, dataPenjualan] =
			await this._service.keuntunganPenjualanBersih(req.query);

		//cari total biaya
		let totalKeuntunganKotor = 0;
		let totalBiayaOperasional = 0;

		PenjualanKotor.forEach((obj) => {
			totalKeuntunganKotor = totalKeuntunganKotor + obj.keuntungan;
		});

		dataBiayaOperasional.forEach((obj) => {
			totalBiayaOperasional = totalBiayaOperasional + obj.total_biaya;
		});

		//ubah bentuk tanggal
		dataBiayaOperasional = dataBiayaOperasional.map((obj) => {
			obj.tanggal_biaya = new Date(obj.tanggal_biaya).toLocaleDateString("fr-CA");
			return obj;
		});

		dataPembelian = dataPembelian.map((obj) => {
			obj.tanggal_beli = new Date(obj.tanggal_beli).toLocaleDateString("fr-CA");
			return obj;
		});

		dataPenjualan = dataPenjualan.map((obj) => {
			obj.tanggal_jual = new Date(obj.tanggal_jual).toLocaleDateString("fr-CA");
			return obj;
		});

		res.status(200).json({
			isSuccess: true,
			totalKeuntunganBersih: totalKeuntunganKotor - totalBiayaOperasional,
			totalKeuntunganKotor,
			totalBiayaOperasional,
			PenjualanKotor,
			dataBiayaOperasional,
			dataPembelian,
			dataPenjualan
		});
	}

	async keuntunganPenjualanKotorHandler(req, res) {
		const data = await this._service.keuntunganPenjualanKotor(req.query);
		let totalKeuntunganKotor = 0;
		data.forEach((obj) => {
			totalKeuntunganKotor = totalKeuntunganKotor + obj.keuntungan;
		});
		res.status(200).json({
			isSuccess: true,
			totalKeuntunganKotor,
			data
		});
	}
}

module.exports = laporanHandler;
