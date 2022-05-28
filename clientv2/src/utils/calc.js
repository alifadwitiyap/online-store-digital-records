
/*
 July
daysInMonth(7,2009); // 31

February
daysInMonth(2,2009); // 28
daysInMonth(2,2008); // 29
*/
const daysInMonth = (month, year) => new Date(year, month, 0).getDate();

function calcBulanan(timeDetails, pembelian, penjualan, biayaOperasional) {
  const { bulan, tahun } = timeDetails;

  let cnt = daysInMonth(bulan + 1, tahun);
  let cashIn = new Array(cnt).fill(0);
  let cashOut = new Array(cnt).fill(0);

  pembelian.forEach(({tanggal_beli, harga_beli, jumlah_dibeli}) => {
    const hari = parseInt(tanggal_beli.split('-')[2]) - 1;
    cashOut[hari] -= harga_beli*jumlah_dibeli;
  });

  penjualan.forEach(({tanggal_jual, harga_jual, jumlah_dijual}) => {
    const hari = parseInt(tanggal_jual.split('-')[2]) - 1;
    cashIn[hari] += harga_jual*jumlah_dijual;
  });

  biayaOperasional.forEach(({tanggal_biaya, total_biaya}) => {
    const hari = parseInt(tanggal_biaya.split('-')[2]) - 1;
    cashOut[hari] -= total_biaya;
  });

  return { cnt, cashIn, cashOut };
}

function calcTahunan(pembelian, penjualan, biayaOperasional) {
  let cnt = 12;
  let cashIn = new Array(cnt).fill(0);
  let cashOut = new Array(cnt).fill(0);

  pembelian.forEach(({tanggal_beli, harga_beli, jumlah_dibeli}) => {
    const bulan = parseInt(tanggal_beli.split('-')[1]) - 1;
    cashOut[bulan] -= harga_beli*jumlah_dibeli;
  });

  penjualan.forEach(({tanggal_jual, harga_jual, jumlah_dijual}) => {
    const bulan = parseInt(tanggal_jual.split('-')[1]) - 1;
    cashIn[bulan] += harga_jual*jumlah_dijual;
  });

  biayaOperasional.forEach(({tanggal_biaya, total_biaya}) => {
    const bulan = parseInt(tanggal_biaya.split('-')[1]) - 1;
    cashOut[bulan] -= total_biaya;
  });

  return { cnt, cashIn, cashOut };
}

// timePeriodData = { period: 0/1/2, details }
// bulanan -> details = { bulan: 2, tahun: 2022 }
function calcCashflowKeuntunganBersih(timePeriodData, pembelian, penjualan, biayaOperasional) {
  if (timePeriodData.period === 0) return { cnt: 0, cashIn: [], cashOut: [] };
  if (timePeriodData.period === 1) return calcBulanan(timePeriodData.details, pembelian, penjualan, biayaOperasional);
  return calcTahunan(pembelian, penjualan, biayaOperasional);
}

export { daysInMonth, calcCashflowKeuntunganBersih };
