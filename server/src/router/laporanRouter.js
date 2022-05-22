const express = require('express');
const protect = require('../middleware/authController');
const laporanHandler = require('../handler/laporanHandler');

/*eslint-disable */
const laporanRouter = express.Router();
const handler = new laporanHandler();
/*eslint-enable */


laporanRouter
	.route("/keuntunganKotor")
	.get(protect,handler.keuntunganPenjualanKotorHandler);

laporanRouter
	.route("/keuntunganBersih")
	.get(protect,handler.kentunganPenjualanBersihHandler);


module.exports = laporanRouter;