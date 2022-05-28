import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../components/Table';
import TableRow from '../components/TableRow';
import { loadDataKeuntunganKotor } from '../features/laporanKeuntunganKotorSlice';

function LaporanKeuntunganKotor() {
  const [tanggal, setTanggal] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const {
    isLoading: tableLoading,
    totalKeuntunganKotor,
    dataKeuntunganKotor,
  } = useSelector((state) => state.keuntunganKotor);

  useEffect(() => {
    dispatch(loadDataKeuntunganKotor());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(loadDataKeuntunganKotor(tanggal));
    setIsLoading(false);
  };

  return (
    <>
      <div className="w-4/5 lg:w-1/4 my-10">
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="mb-4 w-full flex items-center gap-3">
            <div>
              <label className="block mb-1">
                Tanggal <span className="text-red-700">*</span>
              </label>
              <DatePicker
                className="input-field"
                selected={tanggal}
                onChange={(tgl) => setTanggal(tgl)}
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
      </div>
      <div className="w-4/6">
        <p className="mb-4">
          Total Keuntungan Kotor: Rp. {totalKeuntunganKotor}
        </p>
        {tableLoading ? (
          <h1>loading data...</h1>
        ) : (
          <Table columnNames={['Kode', 'Nama', 'Harga Modal', 'Harga Jual', 'Keuntungan']} >
            {dataKeuntunganKotor.map((data, idx) => {
              const { id_barang, nama, harga_modal, harga_jual, keuntungan } = data;
              return (
                <TableRow
                  key={idx}
                  data={[id_barang, nama, harga_modal, harga_jual, keuntungan]}
                />
              );
            })}
          </Table>
        )}
      </div>
    </>
  );
}

export default LaporanKeuntunganKotor;
