import { useEffect, useState } from 'react';
import Title from '../components/Title';
import Sidebar from '../components/Sidebar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useAuth from '../utils/useAuth';
import { convertDateToString } from '../utils/dateConversion';
import Axios from '../utils/axios';
import { useSelector } from 'react-redux';
import { notifyError, notifySuccess } from '../utils/notify';
import BackToMenu from '../components/BackToMenu';

function InputBarangBaru() {
  const [auth, isAuthenticated] = useAuth();
  const [formData, setFormData] = useState({
    tanggal: new Date(),
    jenis: '',
    total_biaya: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    auth();
    if (!isAuthenticated) return;
  }, [auth, isAuthenticated]);

  const onFieldChange = (e) => {
    let val = e.target.value;
    if (e.target.type === 'number') val = parseInt(val);

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: val,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = {
        ...formData,
        tanggal: convertDateToString(formData.tanggal),
      };
      await Axios.post('/barang/biayaOperasional', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      notifySuccess('Data berhasil ditambah');
    } catch (error) {
      notifyError('Data barang gagal diinput');
    }
    setIsLoading(false);
  };

  return (
    <>
      <Sidebar />
      <div className="flex flex-col gap-5 justify-center items-center h-screen">
        <div className="w-4/5 lg:w-1/4 mb-6">
          <Title className="text-2xl text-black mb-8">Input Biaya Operasional</Title>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div className="mb-4 w-full">
              <label className="block mb-1">
                Tanggal <span className="text-red-700">*</span>
              </label>
              <DatePicker
                className="input-field"
                selected={formData.tanggal}
                onChange={(tanggal) =>
                  setFormData((prev) => ({ ...prev, tanggal }))
                }
              />
            </div>
            <div className="mb-4 w-full">
              <label className="block mb-1">
                Jenis Pengeluaran <span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                name="jenis"
                className="input-field"
                value={formData.jenis}
                placeholder="cth: Gaji Pegawai A September 2020"
                onChange={onFieldChange}
              />
            </div>
            <div className="mb-4 w-full">
              <label className="block mb-1">
                Biaya Pengeluaran (Rp) <span className="text-red-700">*</span>
              </label>
              <input
                type="number"
                name="total_biaya"
                className="input-field"
                value={formData.total_biaya}
                placeholder="cth: 100.000"
                onChange={onFieldChange}
                min="0"
              />
            </div>
            {isLoading ? (
              <button type="button" className="btn">
                loading...
              </button>
            ) : (
              <button type="submit" className="btn">
                Tambahkan
              </button>
            )}
          </form>
          <BackToMenu />
        </div>
      </div>
    </>
  );
}

export default InputBarangBaru;
