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

function InputBarangBaru() {
  const [auth, isAuthenticated] = useAuth();
  const [formData, setFormData] = useState({
    tanggal: new Date(),
    id_barang: '',
    nama: '',
    harga_beli: 0,
    supplier: '',
    jumlah_dibeli: 1,
  });
  const [isLoading, setIsLoading] = useState(false);

  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    auth();
    if (!isAuthenticated) return;
  }, [auth, isAuthenticated]);

  const onFieldChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
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
      await Axios.post('/barang/inputBarang', data, {
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
          <Title className="text-2xl text-black mb-8">Input Barang Baru</Title>
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
                Kode Barang <span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                name="id_barang"
                className="input-field"
                value={formData.id_barang}
                placeholder="cth: 086.1021"
                onChange={onFieldChange}
              />
            </div>
            <div className="mb-4 w-full">
              <label className="block mb-1">
                Nama Barang <span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                name="nama"
                className="input-field"
                value={formData.nama}
                placeholder="cth: Gamis Hitam Maxmara Ceruty"
                onChange={onFieldChange}
              />
            </div>
            <div className="mb-4 w-full">
              <label className="block mb-1">
                Nama Supplier <span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                name="supplier"
                className="input-field"
                value={formData.supplier}
                placeholder="cth: Grosir gamis syari medan"
                onChange={onFieldChange}
              />
            </div>
            <div className="mb-4 w-full">
              <label className="block mb-1">
                Harga Satuan (Rp) <span className="text-red-700">*</span>
              </label>
              <input
                type="number"
                name="harga_beli"
                className="input-field"
                value={formData.harga_beli}
                placeholder="cth: 100.000"
                onChange={onFieldChange}
                min="0"
              />
            </div>
            <div className="mb-4 w-full">
              <label className="block mb-1">
                Jumlah Barang <span className="text-red-700">*</span>
              </label>
              <input
                type="number"
                name="jumlah_dibeli"
                className="input-field"
                value={formData.jumlah_dibeli}
                placeholder="cth: 2"
                onChange={onFieldChange}
                min="1"
              />
            </div>
            {isLoading ? (
              <button type="button" className="btn">
                loading...
              </button>
            ) : (
              <button type="submit" className="btn">
                Tambahkan Barang
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default InputBarangBaru;
