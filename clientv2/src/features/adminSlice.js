import { createSlice } from "@reduxjs/toolkit";
import Axios from '../utils/axios';

const initialState = {
  isLoading: false,
  accounts: [],
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAccounts: (state, action) => {
      state.accounts = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  }
});

export const { setAccounts, setLoading } = adminSlice.actions;

export const getAccounts = () => {
  return async (dispatch, getState) => {
    if (getState().admin.accounts.length === 0)
      dispatch(setLoading(true));

    const user = localStorage.getItem('user');
    const token = JSON.parse(user).token;
    const users = await Axios.get('/users/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(setAccounts(users.data.data));
    dispatch(setLoading(false));
  };
}

export default adminSlice.reducer;
