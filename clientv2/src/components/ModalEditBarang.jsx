import { useState } from "react";
import { useSelector } from "react-redux";
import Title from "./Title";
import Axios from '../utils/axios';
import { notifyError, notifySuccess } from "../utils/notify";

function ModalEditBarang({ isOpened, id_barang, nama, supplier, close }) {
  const [formData, setFormData] = useState({
    nama,
    supplier
  });

  const { token } = useSelector((state) => state.user);

  const onFieldChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Axios.put(`/barang/stock/${id_barang}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      notifySuccess('Data berhasil diedit');
    } catch (error) {
      notifyError('Data gagal diedit');
    }
    close();
  };

  if (!isOpened) return <></>;
  return  (
    <div className="z-20 absolute h-screen w-screen bg-black bg-opacity-30 flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-md flex flex-col items-center gap-6">
        <Title>{`Edit - ${id_barang}`}</Title>
        <div className="mb-4 w-full">
          <label className="block mb-1">
            Nama Barang <span className="text-red-700">*</span>
          </label>
          <input
            type="text"
            name="nama"
            className="input-field"
            value={formData.nama}
            onChange={onFieldChange}
          />
        </div>
        <div className="mb-4 w-full">
          <label className="block mb-1">
            Supplier <span className="text-red-700">*</span>
          </label>
          <input
            type="text"
            name="supplier"
            className="input-field"
            value={formData.supplier}
            onChange={onFieldChange}
          />
        </div>
        <button type="submit" className="btn">
          Edit
        </button>
      </form>
    </div>
  );
}

export default ModalEditBarang;
