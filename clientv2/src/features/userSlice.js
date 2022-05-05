import { createSlice } from '@reduxjs/toolkit';

const user = localStorage.getItem('user');
let initialState;

if (user) {
  initialState = JSON.parse(user);
} else {
  initialState = {
    id_akun: '',
    username: '',
    nama: '',
    role: '',
    token: ''
  };
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.id_akun = action.payload.id_akun;
      state.username = action.payload.username;
      state.nama = action.payload.nama;
      state.role = action.payload.role;
      state.token = action.payload.token;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.id_akun = '';
      state.username = '';
      state.nama = '';
      state.role = '';
      state.token = '';
      localStorage.removeItem('user');
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
