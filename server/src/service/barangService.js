const { nanoid } = require("nanoid");
const ErrorResponse = require("../utils/ErrorResponse");
const DBPool = require("../utils/DBPool");
const fuzzyService = require("./fuzzyService");

class barangService {
	constructor() {
		this._pool = DBPool.get();
	}
	// add barang
	async inputBarangBaru({ tanggal, id_barang, nama, harga_beli_satuan, supplier, jumlah_dibeli }) {
		if (!(await this._isBarangExist(id_barang))) {
			const addBarangQuery = {
				text: "INSERT INTO barang VALUES($1, $2, $3, $4, $5)",
				values: [id_barang, nama, supplier, 0, 0]
			};
			await this._pool.query(addBarangQuery);
		}

		// check apakan id barang telah digunakan
		await this._cekKepemilikanID(id_barang, nama, supplier);

		// Tambah pembelian
		const id_pembelian = `pembelian-${nanoid(16)}`;
		const tambahPembelianQuery = {
			text: "INSERT INTO pembelian_barang VALUES($1, $2, $3, $4, $5) ",
			values: [id_pembelian, id_barang, harga_beli_satuan, jumlah_dibeli, tanggal]
		};
		await this._pool.query(tambahPembelianQuery);

		// Update jumlah barang
		const jmlBarangSebelum = await this._checkJumlahBarang(id_barang);
		const updatedJmlBarang = jmlBarangSebelum + jumlah_dibeli;
		const result = await this._updateJmlBarang(updatedJmlBarang, id_barang);

		// hitung modal barang
		await this._hitungModal(
			jmlBarangSebelum,
			harga_beli_satuan,
			result.rows[0].modal,
			jumlah_dibeli,
			updatedJmlBarang,
			id_barang
		);

		return result.rows[0].id_barang;
	}

	async inputBarangTerjual({ tanggal, id_barang, jumlah_dijual, harga_jual }) {
		// kondisi err check
		if (!(await this._isBarangExist(id_barang))) {
			throw new ErrorResponse("id barang tidak ditemukan, tidak dapat menjual barang yang kosong", 404);
		}

		if (jumlah_dijual < 1) {
			throw new ErrorResponse("jumlah barang tidak boleh kurang dari 1", 400);
		}

		const jmlBarangSebelum = await this._checkJumlahBarang(id_barang);
		const updatedJmlBarang = jmlBarangSebelum - jumlah_dijual;
		if (updatedJmlBarang < 0) {
			throw new ErrorResponse("jumlah barang tidak mencukupi", 400);
		}

		//tambah penjualan
		const id_penjualan = `penjualan-${nanoid(16)}`;
		const tambahPenjualanQuery = {
			text: "INSERT INTO penjualan_barang VALUES($1, $2, $3, $4, $5) ",
			values: [id_penjualan, id_barang, harga_jual, jumlah_dijual, tanggal]
		};
		await this._pool.query(tambahPenjualanQuery);

		//update jumlah barang
		const result = await this._updateJmlBarang(updatedJmlBarang, id_barang);
		const fs = new fuzzyService();
		await fs.updateScore(id_barang);

		return result.rows[0].id_barang;
	}

	async inputBiayaOperasional({ tanggal, jenis, total_biaya }) {
		if (total_biaya < 0) {
			throw new ErrorResponse("biaya tidak boleh negatif", 400);
		}

		const id_biaya = `operasional-${nanoid(16)}`;
		const query = {
			text: "INSERT INTO biaya_operasional VALUES($1, $2, $3, $4) ",
			values: [id_biaya, jenis, total_biaya, tanggal]
		};
		await this._pool.query(query);
	}

	async getAllPenjualanBarangByDate({ tanggal_awal, tanggal_akhir, search = "" }) {
		const query = {
			text: `SELECT barang.nama, 
			barang.id_barang, 
			(penjualan_barang.harga_jual * penjualan_barang.jumlah_dijual) as harga_penjualan,
			penjualan_barang.tanggal_jual
			FROM penjualan_barang 
			LEFT JOIN barang ON penjualan_barang.id_barang = barang.id_barang
			WHERE (barang.nama ILIKE $1 OR barang.id_barang ILIKE $1) AND penjualan_barang.tanggal_jual BETWEEN $2 AND $3  `,
			values: [`${search}%`, tanggal_awal, tanggal_akhir]
		};
		const result = await this._pool.query(query);

		return result.rows;
	}

	async getAllStocks({ search = "" }) {
		const query = {
			text: "SELECT * FROM barang WHERE nama ILIKE $1 OR id_barang ILIKE $1 OR supplier ILIKE $1",
			values: [`${search}%`]
		};
		const result = await this._pool.query(query);

		return result.rows;
	}

	async updateStockById({ id }, { nama, supplier }) {
		const query = {
			text: "UPDATE barang SET nama=$1, supplier=$2 WHERE id_barang = $3 RETURNING id_barang",
			values: [nama, supplier, id]
		};
		const result = await this._pool.query(query);

		if (result.rows.length < 1) {
			throw new ErrorResponse("id barang tidak ditemukan", 404);
		}
	}

	async deleteStockById({ id }) {
		const query = {
			text: "DELETE FROM barang WHERE id_barang=$1 RETURNING id_barang",
			values: [id]
		};
		const result = await this._pool.query(query);

		if (result.rows < 1) {
			throw new ErrorResponse("id tidak ditemukan", 404);
		}
	}

	// ========================================================================== //
	//
	// utility

	async _isBarangExist(id_barang) {
		const query = {
			text: "SELECT id_barang FROM barang WHERE id_barang = $1",
			values: [id_barang]
		};
		const result = await this._pool.query(query);

		if (result.rows.length < 1) {
			return false;
		}

		return true;
	}

	async _checkJumlahBarang(id_barang) {
		const query = {
			text: "SELECT jumlah FROM barang WHERE id_barang = $1",
			values: [id_barang]
		};
		const result = await this._pool.query(query);

		if (result.rows.length < 1) {
			return 0;
		}

		return result.rows[0].jumlah;
	}

	async _updateJmlBarang(updatedJmlBarang, id_barang) {
		const updateBarangQuery = {
			text: "UPDATE barang SET jumlah = $1 WHERE id_barang = $2 RETURNING id_barang, modal",
			values: [updatedJmlBarang, id_barang]
		};
		const result = await this._pool.query(updateBarangQuery);
		return result;
	}

	async _hitungModal(
		jmlBarangSebelum,
		hargaSatuanTambahan,
		hargaSatuanSebelum,
		jumlahBarangTambahan,
		totalJumlahBarang,
		id_barang
	) {
		let modal = 0;

		if (jmlBarangSebelum == 0) {
			modal = hargaSatuanTambahan;
		} else {
			const modalSebelum = hargaSatuanSebelum * jmlBarangSebelum;
			const modalTambahan = hargaSatuanTambahan * jumlahBarangTambahan;
			//* (modalSebelum * jmlSebelum + harga_beli_satuan * jumlah_dibeli)/updatedJmlBarang  rumus  (7+7+3+3)/4
			modal = Math.ceil((modalSebelum + modalTambahan) / totalJumlahBarang);
		}

		const updateModalQuery = {
			text: "UPDATE barang SET modal=$1 WHERE id_barang = $2",
			values: [modal, id_barang]
		};

		await this._pool.query(updateModalQuery);
	}

	async _cekKepemilikanID(id_barang, nama, supplier) {
		const cekNamaBarang = {
			text: "SELECT nama, supplier FROM barang WHERE id_barang = $1",
			values: [id_barang]
		};
		const result = await this._pool.query(cekNamaBarang);

		if ((result.rows[0].nama !== nama, result.rows[0].supplier !== supplier)) {
			throw new ErrorResponse("id barang telah digunakan oleh barang lain", 400);
		}
	}
}

module.exports = barangService;
