import { createSlice } from '@reduxjs/toolkit';
import Axios from '../utils/axios';
import { convertDateToString } from '../utils/dateConversion';

const initialState = {
  isLoading: false,
  dataPenjualan: [],
  totalPenjualan: 0
};

export const laporanPenjualanSlice = createSlice({
  name: 'penjualan',
  initialState,
  reducers: {
    setDataPenjualan: (state, action) => {
      state.dataPenjualan = action.payload.data;
      state.totalPenjualan = action.payload.totalPenjualan;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setDataPenjualan, setLoading } = laporanPenjualanSlice.actions;

export const loadDataPenjualan = (
  tanggalAwal = new Date(),
  tanggalAkhir = new Date(),
  search = ''
) => {
  return async (dispatch, getState) => {
    if (getState().penjualan.dataPenjualan.length === 0)
      dispatch(setLoading(true));

    const user = localStorage.getItem('user');
    const token = JSON.parse(user).token;
    const params = {
      tanggal_awal: convertDateToString(tanggalAwal),
      tanggal_akhir: convertDateToString(tanggalAkhir),
      search: search,
    };

    const res = await Axios.get('/barang/Penjualan', {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(setDataPenjualan(res.data));
    dispatch(setLoading(false));
  };
};

export default laporanPenjualanSlice.reducer;
