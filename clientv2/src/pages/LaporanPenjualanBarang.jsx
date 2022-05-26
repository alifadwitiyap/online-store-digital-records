import { useEffect, useState } from 'react';
import Title from '../components/Title';
import Sidebar from '../components/Sidebar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useAuth from '../utils/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import BackToMenu from '../components/BackToMenu';
import { loadDataPenjualan } from '../features/laporanPenjualanSlice';
import TableRow from '../components/TableRow';
import Table from '../components/Table';

function LaporanPenjualanBarang() {
  const [auth, isAuthenticated] = useAuth();
  const dispatch = useDispatch();
  const [tanggalAwal, setTanggalAwal] = useState(new Date());
  const [tanggalAkhir, setTanggalAkhir] = useState(new Date());
  const [searchString, setSearchString] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    isLoading: tableLoading,
    totalPenjualan,
    dataPenjualan,
  } = useSelector((state) => state.penjualan);

  useEffect(() => {
    auth();
    if (!isAuthenticated) return;
    dispatch(loadDataPenjualan());
  }, [auth, isAuthenticated, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(loadDataPenjualan(tanggalAwal, tanggalAkhir, searchString));
    setIsLoading(false);
  };

  return (
    <>
      <Sidebar />
      <div className="flex flex-col items-center">
        <div className="w-4/5 lg:w-1/4 my-10">
          <Title className="text-2xl text-black mb-8">
            Laporan Penjualan Barang
          </Title>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div className="mb-4 w-full flex items-center gap-3">
              <div>
                <label className="block mb-1">
                  Tanggal Awal <span className="text-red-700">*</span>
                </label>
                <DatePicker
                  className="input-field"
                  selected={tanggalAwal}
                  onChange={(tanggal) => setTanggalAwal(tanggal)}
                />
              </div>
              <div className="border-t-2 w-4 border-gray-400 translate-y-4"></div>
              <div>
                <label className="block mb-1">
                  Tanggal Akhir <span className="text-red-700">*</span>
                </label>
                <DatePicker
                  className="input-field"
                  selected={tanggalAkhir}
                  onChange={(tanggal) => setTanggalAkhir(tanggal)}
                />
              </div>
            </div>
            {isLoading ? (
              <button type="button" className="btn">
                loading...
              </button>
            ) : (
              <button type="submit" className="btn">
                Cek
              </button>
            )}
          </form>
          <BackToMenu />
        </div>
        <div className="w-4/6">
          <div className="w-full flex justify-between mb-4">
            <p>Total Penjualan: Rp. {totalPenjualan}</p>
            <div className="flex gap-4">
              <input
                type="text"
                value={searchString}
                className="input-field"
                onChange={(e) => setSearchString(e.target.value)}
              />
              <button
                type="button"
                className="btn"
                onClick={() =>
                  dispatch(
                    loadDataPenjualan(tanggalAwal, tanggalAkhir, searchString)
                  )
                }
              >
                Search
              </button>
            </div>
          </div>
          {tableLoading ? (
            <h1>loading data...</h1>
          ) : (
            <Table columnNames={['Kode', 'Nama', 'Harga Jual']}>
              {dataPenjualan.map((data, idx) => (
                <TableRow
                  key={idx}
                  data={[data.id_barang, data.nama, data.harga_penjualan]}
                />
              ))}
            </Table>
          )}
        </div>
      </div>
    </>
  );
}

export default LaporanPenjualanBarang;
