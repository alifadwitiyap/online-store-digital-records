import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Title from '../components/Title';
import Sidebar from '../components/Sidebar';
import Table from '../components/Table';
import TableRow from '../components/TableRow';
import BackToMenu from '../components/BackToMenu';
import useAuth from '../utils/useAuth';
import { notifyError, notifySuccess } from '../utils/notify';
import Axios from '../utils/axios';
import { getAccounts } from '../features/adminSlice';

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
  const { isLoading: tableLoading, accounts } = useSelector(
    (state) => state.admin
  );
  const dispatch = useDispatch();

  useEffect(() => {
    auth();
    if (!isAuthenticated) return;
    dispatch(getAccounts());
  }, [auth, isAuthenticated, dispatch]);

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
      await Axios.post('/users/register', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      notifySuccess('Akun berhasil dibuat');
      dispatch(getAccounts());
    } catch (error) {
      notifyError('Akun gagal dibuat');
    }
    setIsLoading(false);
  };

  const deleteHandler = async (id) => {
    try {
      await Axios.delete(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      notifySuccess('Akun berhasil dihapus');
      dispatch(getAccounts());
    } catch (error) {
      notifyError('Akun gagal dihapus');
    }
  };

  return (
    <>
      <Sidebar />
      <div className="flex flex-col items-center h-screen mb-10">
        <div className="w-4/5 lg:w-1/4 my-10">
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
        <div className="w-4/6">
          {tableLoading ? (
            <h1>loading accounts...</h1>
          ) : (
            <Table columnNames={['Nama', 'Username', 'Role', 'Action']}>
              {accounts.map((data) => (
                <TableRow
                  key={data.id_akun}
                  data={[
                    data.nama,
                    data.username,
                    data.role,
                    <button
                      type="button"
                      className="btn"
                      onClick={() => deleteHandler(data.id_akun)}
                    >
                      Hapus
                    </button>,
                  ]}
                />
              ))}
            </Table>
          )}
        </div>
      </div>
    </>
  );
}

export default PengaturanAkunPegawai;
