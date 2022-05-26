import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import adminReducer from '../features/adminSlice';
import laporanSisaStokReducer from '../features/laporanSisaStokSlice';
import laporanPenjualanReducer from '../features/laporanPenjualanSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
    stok: laporanSisaStokReducer,
    penjualan: laporanPenjualanReducer,
  },
});

export default store;
