import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import adminReducer from '../features/adminSlice';
import laporanPenjualanReducer from '../features/laporanPenjualanSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
    penjualan: laporanPenjualanReducer,
  },
});

export default store;
