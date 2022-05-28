import { createSlice } from '@reduxjs/toolkit';
import Axios from '../utils/axios';
import { calcCashflowKeuntunganBersih } from '../utils/calc';

const initialState = {
  isLoading: false,
  hasLoadedBefore: false,
  totalKeuntunganKotor: 0,
  totalKeuntunganBersih: 0,
  totalBiayaOperasional: 0,
  dataBiayaOperasional: [],
  dataCashFlow: {
    cnt: 0,
    cashIn: [],
    cashOut: [],
  },
};

export const laporanKeuntunganBersihSlice = createSlice({
  name: 'keuntunganBersih',
  initialState,
  reducers: {
    setDataKeuntunganBersih: (state, action) => {
      state.totalKeuntunganKotor = action.payload.totalKeuntunganKotor;
      state.totalKeuntunganBersih = action.payload.totalKeuntunganBersih;
      state.totalBiayaOperasional = action.payload.totalBiayaOperasional;
      state.dataBiayaOperasional =  action.payload.dataBiayaOperasional;
      state.dataCashFlow = action.payload.dataCashFlow;
      state.hasLoadedBefore = true;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setDataKeuntunganBersih, setLoading } = laporanKeuntunganBersihSlice.actions;

// timePeriodData = { period: 0/1/2, details }
// bulanan -> details = { bulan: 2, tahun: 2022 }
// tahunan -> details = { tahun: 2022 }
export const loadDataKeuntunganBersih = (
  tanggalAwal,
  tanggalAkhir,
  timePeriodData
) => {
  return async (dispatch, getState) => {
    if (!getState().keuntunganBersih.hasLoadedBefore)
      dispatch(setLoading(true));

    const user = localStorage.getItem('user');
    const token = JSON.parse(user).token;
    const params = {
      tanggal_awal: tanggalAwal,
      tanggal_akhir: tanggalAkhir,
    };

    const res = await Axios.get('/laporan/keuntunganBersih', {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = {
      totalKeuntunganKotor: res.data.totalKeuntunganKotor,
      totalKeuntunganBersih: res.data.totalKeuntunganBersih,
      totalBiayaOperasional: res.data.totalBiayaOperasional,
      dataBiayaOperasional: res.data.dataBiayaOperasional,
      dataCashFlow: calcCashflowKeuntunganBersih(
        timePeriodData,
        res.data.dataPembelian,
        res.data.dataPenjualan,
        res.data.dataBiayaOperasional
      ),
    };

    dispatch(setDataKeuntunganBersih(data));
    dispatch(setLoading(false));
  };
};

export default laporanKeuntunganBersihSlice.reducer;
