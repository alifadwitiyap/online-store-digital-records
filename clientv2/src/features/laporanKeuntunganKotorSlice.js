import { createSlice } from '@reduxjs/toolkit';
import Axios from '../utils/axios';
import { convertDateToString } from '../utils/dateConversion';

const initialState = {
  isLoading: false,
  dataKeuntunganKotor: [],
  totalKeuntunganKotor: 0,
};

export const laporanKeuntunganKotorSlice = createSlice({
  name: 'keuntunganKotor',
  initialState,
  reducers: {
    setDataKeuntunganKotor: (state, action) => {
      state.dataKeuntunganKotor = action.payload.data;
      state.totalKeuntunganKotor = action.payload.totalKeuntunganKotor;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setDataKeuntunganKotor, setLoading } = laporanKeuntunganKotorSlice.actions;

export const loadDataKeuntunganKotor = (tanggal = new Date()) => {
  return async (dispatch, getState) => {
    if (getState().keuntunganKotor.dataKeuntunganKotor.length === 0)
      dispatch(setLoading(true));

    const user = localStorage.getItem('user');
    const token = JSON.parse(user).token;
    const params = {
      tanggal: convertDateToString(tanggal),
    };

    const res = await Axios.get('/laporan/keuntunganKotor', {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(setDataKeuntunganKotor(res.data));
    dispatch(setLoading(false));
  };
};

export default laporanKeuntunganKotorSlice.reducer;
