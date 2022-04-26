const protect = require('../middleware/authHandler');
const express = require('express');
const barangHandler = require('../handler/barangHandler');

const handler = new barangHandler()
const router = express.Router()

router
    .route('/inputBarang')
    .post(protect, handler.postInputBarang)

router
    .route('/biayaOperasional')
    .post(protect, handler.postBiayaOperasional)

router
    .route('/Penjualan')
    .post(protect, handler.postInputPenjualan)
    .get(protect, handler.getAllPenjualanBarangByDate)


module.exports = router