const protect = require('../middleware/authHandler');
const express = require('express');
const barangHandler = require('../handler/barangHandler');

const handler = new barangHandler()
const router = express.Router()

router
    .route('/inputBarang')
    .post(handler.postInputBarang)

router
    .route('/biayaOperasional')
    .post(handler.postBiayaOperasional)

router
    .route('/Penjualan')
    .post(handler.postInputPenjualan)
    .get(handler.getAllPenjualanBarangByDate)


module.exports = router