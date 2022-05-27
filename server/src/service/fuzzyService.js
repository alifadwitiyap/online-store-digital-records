const DBPool = require("../utils/DBPool");
const Logic = require("es6-fuzz");
const Trapezoid = require("es6-fuzz/lib/curve/trapezoid");
const Triangle = require("es6-fuzz/lib/curve/triangle");
const ErrorResponse = require("../utils/ErrorResponse");

//TODO coba tuning
//! taro kalo barang dijual itung scorenya
class fuzzyService {
	constructor() {
		this._pool = DBPool.get();
	}

	async updateScore(idBarang) {
		const fuzzyScore = await this._getFuzzyScore(idBarang);

		if (fuzzyScore instanceof ErrorResponse) {
			return fuzzyScore;
		}

		const updateModalQuery = {
			text: "UPDATE barang SET score=$1 WHERE id_barang = $2",
			values: [fuzzyScore, idBarang]
		};

		await this._pool.query(updateModalQuery);
	}

	async _getFuzzyScore(idBarang) {
		let banyakPembelian = await this._pool.query({
			text: "SELECT SUM(jumlah_dibeli) FROM pembelian_barang WHERE id_barang= $1",
			values: [idBarang]
		});
		[banyakPembelian] = banyakPembelian.rows;
		banyakPembelian = banyakPembelian.sum;

		if (banyakPembelian < 1) {
			return new ErrorResponse("pembelian tidak ditemukan", 404);
		}

		let banyakPenjualan = await this._pool.query({
			text: "SELECT SUM(jumlah_dijual) FROM penjualan_barang WHERE id_barang= $1",
			values: [idBarang]
		});
		[banyakPenjualan] = banyakPenjualan.rows;
		banyakPenjualan = banyakPenjualan.sum;

		let val1 = (banyakPenjualan / banyakPembelian) * 100;
		val1 = val1 > 0 ? val1 : 0;
		val1 = val1 < 100 ? val1 : 100;

		const dataKeuntungan = await this._getDataKeuntungan(idBarang);

		if (!dataKeuntungan) {
			return new ErrorResponse("data keuntungan tidak ditemukan", 404);
		}

		const totalKeuntungan = dataKeuntungan.keuntungan;
		const keuntunganTarget = dataKeuntungan.harga_modal * 1.2;
		let val2 = (totalKeuntungan / keuntunganTarget) * 100;
		val2 = val2 > 0 ? val2 : 0;
		val2 = val2 < 100 ? val2 : 100;

		const logic = new Logic();

		const fuzzyModel1 = logic
			.init("Buruk", new Trapezoid(-1, 0, 20, 40))
			.or("Sedang", new Triangle(20, 40, 70))
			.or("Baik", new Trapezoid(40, 70, 100, 101));

		const fuzzyModel2 = logic
			.init("Buruk", new Trapezoid(-1, 0, 20, 40))
			.or("Sedang", new Triangle(20, 40, 70))
			.or("Baik", new Trapezoid(40, 70, 100, 101));

		let nilaiKeanggotaan1 = fuzzyModel1.defuzzify(val1);
		nilaiKeanggotaan1 = nilaiKeanggotaan1.rules.slice(0, 3);
		nilaiKeanggotaan1 = nilaiKeanggotaan1.map((obj) => obj.fuzzy);

		let nilaiKeanggotaan2 = fuzzyModel2.defuzzify(val2);
		nilaiKeanggotaan2 = nilaiKeanggotaan2.rules.slice(0, 3);
		nilaiKeanggotaan2 = nilaiKeanggotaan2.map((obj) => obj.fuzzy);

		let aturanInferensi = [
			[0, 0, 1],
			[0, 0, 1],
			[1, 1, 2]
		];

		let keanggotaanInferensi = [0, 0, 0];
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				let min_v1_v2_pada_ij = Math.min(nilaiKeanggotaan1[i], nilaiKeanggotaan2[j]);
				let kategori_inf = aturanInferensi[i][j];
				if (min_v1_v2_pada_ij > keanggotaanInferensi[kategori_inf]) {
					keanggotaanInferensi[kategori_inf] = min_v1_v2_pada_ij;
				}
			}
		}

		const mul = [10, 75, 100];
		let res = [0, 0, 0];
		mul.forEach((e, idx) => {
			res[idx] = e * keanggotaanInferensi[idx];
		});

		res = res.reduce((a, b) => a + b, 0);
		res = res / keanggotaanInferensi.reduce((a, b) => a + b, 0);
		res = parseInt(res);

		return res;
	}

	async _getDataKeuntungan(barangId) {
		const query = {
			text: `
			SELECT *, (x.harga_jual-x.harga_modal)::INTEGER as keuntungan FROM
			(
			SELECT barang.id_barang,barang.nama,SUM(penjualan_barang.harga_jual * penjualan_barang.jumlah_dijual)::INTEGER as harga_jual, SUM(barang.modal * penjualan_barang.jumlah_dijual)::INTEGER as harga_modal FROM penjualan_barang 
			LEFT JOIN barang ON barang.id_barang = penjualan_barang.id_barang
			WHERE penjualan_barang.id_barang=$1
			GROUP BY barang.id_barang
			) as x`,
			values: [barangId]
		};
		const result = await this._pool.query(query);

		return result.rows[0];
	}
}

module.exports = fuzzyService;
