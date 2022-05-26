import { createSlice } from '@reduxjs/toolkit';
import Axios from '../utils/axios';

const initialState = {
  isLoading: false,
  dataStok: [],
};

export const laporanSisaStokSlice = createSlice({
  name: 'stok',
  initialState,
  reducers: {
    setDataStok: (state, action) => {
      state.dataStok = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setDataStok, setLoading } = laporanSisaStokSlice.actions;

export const loadDataStok = (search = '') => {
  return async (dispatch, getState) => {
    if (getState().stok.dataStok.length === 0)
      dispatch(setLoading(true));

    const user = localStorage.getItem('user');
    const token = JSON.parse(user).token;
    const params = { search: search };

    const res = await Axios.get('/barang/stock', {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(setDataStok(res.data.data));
    dispatch(setLoading(false));
  };
};

export default laporanSisaStokSlice.reducer;
