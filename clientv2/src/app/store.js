import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import adminReducer from '../features/adminSlice';
import laporanSisaStokReducer from '../features/laporanSisaStokSlice';
import laporanPenjualanReducer from '../features/laporanPenjualanSlice';
import laporanKeuntunganKotorReducer from '../features/laporanKeuntunganKotorSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
    stok: laporanSisaStokReducer,
    penjualan: laporanPenjualanReducer,
    keuntunganKotor: laporanKeuntunganKotorReducer,
  },
});

export default store;
