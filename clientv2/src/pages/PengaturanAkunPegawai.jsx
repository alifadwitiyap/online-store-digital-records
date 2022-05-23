import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Title from '../components/Title';
import Sidebar from '../components/Sidebar';
import BackToMenu from '../components/BackToMenu';
import useAuth from '../utils/useAuth';
import { convertDateToString } from '../utils/dateConversion';
import { notifyError, notifySuccess } from '../utils/notify';
import Axios from '../utils/axios';

// TODO: getAllUsers belum ada, jadi table nya belum bisa dikerjain

function PengaturanAkunPegawai() {
  const [auth, isAuthenticated] = useAuth();
  const [formData, setFormData] = useState({
    nama: '',
    username: '',
    password: '',
    role: 'pegawai',
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
      await Axios.post('/users/register', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      notifySuccess('Akun berhasil dibuat');
    } catch (error) {
      notifyError('Akun gagal dibuat');
    }
    setIsLoading(false);
  };

  return (
    <>
      <Sidebar />
      <div className="flex flex-col gap-5 justify-center items-center h-screen">
        <div className="w-4/5 lg:w-1/4 mb-6">
          <Title className="text-2xl text-black mb-8">Akun</Title>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div className="mb-4 w-full">
              <label className="block mb-1">
                Nama <span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                name="nama"
                className="input-field"
                value={formData.nama}
                placeholder="cth: Udin Budi"
                onChange={onFieldChange}
              />
            </div>
            <div className="mb-4 w-full">
              <label className="block mb-1">
                Username <span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                name="username"
                className="input-field"
                value={formData.username}
                placeholder="cth: udinb"
                onChange={onFieldChange}
              />
            </div>
            <div className="mb-4 w-full">
              <label className="block mb-1">
                Password <span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                name="password"
                className="input-field"
                value={formData.password}
                placeholder="cth: udin123"
                onChange={onFieldChange}
              />
            </div>
            <div className="mb-4 w-full">
              <label className="block mb-1">
                Role <span className="text-red-700">*</span>
              </label>
              <select
                name="role"
                value={formData.role}
                className="dropdown"
                onChange={onFieldChange}
              >
                <option value="pegawai">Pegawai</option>
                <option value="owner">Owner</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            {isLoading ? (
              <button type="button" className="btn">
                loading...
              </button>
            ) : (
              <button type="submit" className="btn">
                Buat
              </button>
            )}
          </form>
          <BackToMenu />
        </div>
      </div>
    </>
  );
}

export default PengaturanAkunPegawai;
