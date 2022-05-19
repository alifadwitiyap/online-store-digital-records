const express = require("express");
const BarangHandler = require("../handler/BarangHandler");
const protect = require("../middleware/authController");

/*eslint-disable */
const BarangRouter = express.Router();
const handler = new BarangHandler();
/*eslint-enable */

BarangRouter
	.route("/stock")
	.get( protect,handler.getAllStocks)
	.post(protect, handler.postInputBarang);

BarangRouter
	.route("/stock/:id")
	.put(protect, handler.updateStockById)
	.delete(protect, handler.deleteStockById);

BarangRouter
	.route("/biayaOperasional")
	.post(protect, handler.postBiayaOperasional);

BarangRouter
	.route("/Penjualan")
	.get( protect, handler.getAllPenjualanBarangByDate)
	.post(protect, handler.postInputPenjualan);

module.exports = BarangRouter;
