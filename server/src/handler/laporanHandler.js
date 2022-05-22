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
		const [dataPenjualanKotor, dataBiayaOperasional] = await this._service.keuntunganPenjualanBersih(
			req.query
		);

		let totalKeuntunganKotor = 0;
		let totalBiayaOperasional = 0;

		dataPenjualanKotor.forEach((obj) => {
			totalKeuntunganKotor = totalKeuntunganKotor + obj.keuntungan;
		});

		dataBiayaOperasional.forEach((obj) => {
			totalBiayaOperasional = totalBiayaOperasional + obj.total_biaya;
		});

		res.status(200).json({
			isSuccess: true,
			totalKeuntunganBersih: totalKeuntunganKotor - totalBiayaOperasional,
			totalKeuntunganKotor,
			totalBiayaOperasional,
			dataPenjualanKotor,
			dataBiayaOperasional
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
