import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../components/Table';
import TableRow from '../components/TableRow';
import FoldableTableRow from '../components/FoldableTableRow';
import MONTHS from '../data/months';
import { loadDataKeuntunganBersih } from '../features/laporanKeuntunganBersihSlice';
import { convertDateToString } from '../utils/dateConversion';
import { daysInMonth } from '../utils/calc';

function LaporanKeuntunganBersih() {
  const [timePeriodChosen, setTimePeriodChosen] = useState(0);
  const [formDataHarian, setFormDataHarian] = useState({ tanggal: new Date() });
  const [formDataBulanan, setFormDataBulanan] = useState({
    bulan: 1,
    tahun: 2022,
  });
  const [formDataTahunan, setFormDataTahunan] = useState({ tahun: 2022 });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const {
    isLoading: tableLoading,
    totalKeuntunganKotor,
    totalKeuntunganBersih,
    totalBiayaOperasional,
    dataBiayaOperasional,
    dataCashFlow,
  } = useSelector((state) => state.keuntunganBersih);

  const formHarian = () => {
    return (
      <div className="mb-4 w-full">
        <label className="block mb-1">
          Tanggal <span className="text-red-700">*</span>
        </label>
        <DatePicker
          className="input-field"
          selected={formDataHarian.tanggal}
          onChange={(tgl) => setFormDataHarian({ tanggal: tgl })}
        />
      </div>
    );
  };

  const formBulanan = () => {
    const onChangeHandler = (e) => {
      setFormDataBulanan((prev) => ({
        ...prev,
        [e.target.name]: parseInt(e.target.value),
      }));
    };
    return (
      <div className="mb-4 w-full flex justify-between items-center">
        <div>
          <label className="block mb-1">
            Bulan <span className="text-red-700">*</span>
          </label>
          <select
            name="bulan"
            value={formDataBulanan.bulan}
            className="dropdown"
            onChange={onChangeHandler}
          >
            {MONTHS.map((m, idx) => (
              <option key={idx} value={idx}>
                {m}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">
            Tahun <span className="text-red-700">*</span>
          </label>
          <input
            type="number"
            name="tahun"
            className="input-field"
            value={formDataBulanan.tahun}
            onChange={onChangeHandler}
            min="2000"
          />
        </div>
      </div>
    );
  };

  const formTahunan = () => {
    return (
      <div className="mb-4 w-full">
        <label className="block mb-1">
          Tahun <span className="text-red-700">*</span>
        </label>
        <input
          type="number"
          name="tahun"
          className="input-field"
          value={formDataTahunan.tahun}
          onChange={(e) => setFormDataTahunan({ tahun: e.target.value })}
          min="2000"
        />
      </div>
    );
  };

  const showForm = () => {
    if (timePeriodChosen === 0) {
      return formHarian();
    } else if (timePeriodChosen === 1) {
      return formBulanan();
    } else {
      return formTahunan();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (timePeriodChosen === 0) {
      const tanggal_awal = convertDateToString(formDataHarian.tanggal), tanggal_akhir = tanggal_awal;
      dispatch(
        loadDataKeuntunganBersih(tanggal_awal, tanggal_akhir, { period: 0 })
      );
    } else if (timePeriodChosen === 1) {
      let { bulan, tahun } = formDataBulanan;
      bulan += 1;
      let bulanString = bulan.toString();
      if (bulanString.length === 0) bulanString = "0" + bulanString;
      const tanggal_awal = `${tahun}-${bulanString}-01`;
      const tanggal_akhir = `${tahun}-${bulanString}-${daysInMonth(bulan, tahun)}`;
      dispatch(
        loadDataKeuntunganBersih(tanggal_awal, tanggal_akhir, {
          period: 1,
          details: formDataBulanan,
        })
      );
    } else {
      const tanggal_awal = `${formDataTahunan.tahun}-01-01`;
      const tanggal_akhir = `${formDataTahunan.tahun}-12-31`;
      dispatch(
        loadDataKeuntunganBersih(tanggal_awal, tanggal_akhir, { period: 2 })
      );
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="w-4/5 lg:w-1/3">
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="mb-4 w-full flex items-center">
            <button
              type="button"
              className="btn flex-1 rounded-r-none"
              onClick={() => setTimePeriodChosen(0)}
            >
              Harian
            </button>
            <button
              type="button"
              className="btn flex-1 rounded-r-none rounded-l-none border-x-2 border-purple-700"
              onClick={() => setTimePeriodChosen(1)}
            >
              Bulanan
            </button>
            <button
              type="button"
              className="btn flex-1 rounded-l-none"
              onClick={() => setTimePeriodChosen(2)}
            >
              Tahunan
            </button>
          </div>
          {showForm()}
          {isLoading ? (
            <button type="button" className="btn mb-5">
              loading...
            </button>
          ) : (
            <button type="submit" className="btn mb-5">
              Cek
            </button>
          )}
        </form>
      </div>
      <div className="w-4/6">
        {tableLoading ? (
          <h1>loading data...</h1>
        ) : (
          <Table columnNames={['Label', 'Nilai']}>
            <TableRow data={['Keuntungan Kotor', totalKeuntunganKotor]} />
            <FoldableTableRow
              data={['Total Biaya Operasional', totalBiayaOperasional]}
              secondaryData={dataBiayaOperasional.map((d) => [
                d.jenis,
                d.total_biaya,
              ])}
            />
            <TableRow data={['Keuntungan Bersih', totalKeuntunganBersih]} />
          </Table>
        )}
      </div>
    </>
  );
}

export default LaporanKeuntunganBersih;
