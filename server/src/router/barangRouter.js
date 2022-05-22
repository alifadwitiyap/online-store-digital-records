const express = require("express");
const protect = require("../middleware/authController");
const barangHandler = require('../handler/barangHandler');


/*eslint-disable */
const barangRouter = express.Router();
const handler = new barangHandler();
/*eslint-enable */

barangRouter
	.route("/stock")
	.get(protect,handler.getAllStocks)
	.post(protect, handler.postInputBarang);

barangRouter
	.route("/stock/:id")
	.put(protect, handler.updateStockById)
	.delete(protect, handler.deleteStockById);

barangRouter
	.route("/biayaOperasional")
	.post(protect, handler.postBiayaOperasional);

barangRouter
	.route("/Penjualan")
	.get( protect, handler.getAllPenjualanBarangByDate)
	.post(protect, handler.postInputPenjualan);

module.exports = barangRouter;
