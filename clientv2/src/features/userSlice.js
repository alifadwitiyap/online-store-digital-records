/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';
// import getBackendUrl from '../utils/getBackendUrl';

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { login } = userSlice.actions;

// export const login = (user) => (dispatch) => {
//   dispatch(startFetchUser());
//   fetch(`${getBackendUrl()}/users/login`, {
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     method: 'POST',
//     body: JSON.stringify(user),
//   })
//     .then((res) => res.json())
//     .then((response) => {
//       console.log(response.data);
//       const userData = response.data.data;
//       dispatch(successFetchUser(userData));
//     });
//   axios
//     .post(`${getBackendUrl()}/users/login`, user)
//     .then((response) => {
//       console.log(response.data);
//       const userData = response.data.data;
//       dispatch(successFetchUser(userData));
//     })
//     .catch((error) => {
//       console.log(error.message);
//       dispatch(failureFetchUser(error.message));
//     });
// };

export default userSlice.reducer;
