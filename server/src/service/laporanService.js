const DBPool = require("../utils/DBPool");

//* hitung keuntungannya dengan harga_jual*byk_jual - harga_modal*byk_jual

class LaporanService {
	constructor() {
		this._pool = DBPool.get();
	}

	async keuntunganPenjualanKotor({ tanggal }) {
		return await this._getPenjualanKotor(tanggal, tanggal);
	}

	async keuntunganPenjualanBersih({ tanggal_awal, tanggal_akhir }) {
		const penjualanKotor = await this._getPenjualanKotor(tanggal_awal, tanggal_akhir);

		const biayaOperasional = await this._getBiayaOperasional(tanggal_awal, tanggal_akhir);

		const dataPembelian = await this._getPembelian(tanggal_awal, tanggal_akhir);

		return [penjualanKotor, biayaOperasional, dataPembelian];
	}

	// ==========================================================================
	// utility
	async _getBiayaOperasional(tanggal_awal, tanggal_akhir) {
		const query = {
			text: `SELECT * FROM biaya_operasional WHERE tanggal_biaya BETWEEN $1 AND $2`,
			values: [tanggal_awal, tanggal_akhir]
		};

		const result = await this._pool.query(query);
		return result.rows;
	}

	async _getPembelian(tanggal_awal, tanggal_akhir) {
		const query = {
			text: `SELECT * FROM pembelian_barang WHERE tanggal_beli BETWEEN $1 AND $2`,
			values: [tanggal_awal, tanggal_akhir]
		};

		const result = await this._pool.query(query);
		return result.rows;
	}

	async _getPenjualanKotor(tanggal_awal, tanggal_akhir) {
		const query = {
			text: `
			SELECT *, (x.harga_jual-x.harga_modal)::INTEGER as keuntungan FROM
			(
			SELECT barang.id_barang,barang.nama,SUM(penjualan_barang.harga_jual * penjualan_barang.jumlah_dijual)::INTEGER as harga_jual, SUM(barang.modal * penjualan_barang.jumlah_dijual)::INTEGER as harga_modal FROM penjualan_barang 
			LEFT JOIN barang ON barang.id_barang = penjualan_barang.id_barang
			WHERE penjualan_barang.tanggal_jual BETWEEN $1 AND $2
			GROUP BY barang.id_barang
			) as x`,
			values: [tanggal_awal, tanggal_akhir]
		};
		const result = await this._pool.query(query);
		return result.rows;
	}
}

module.exports = LaporanService;
