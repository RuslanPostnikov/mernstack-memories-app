import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '../../api';

export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ formData, navigate }) => {
    const { data } = await api.signIn(formData);

    navigate('/');

    return data;
  },
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ formData, navigate }) => {
    const { data } = await api.signUp(formData);

    navigate('/');

    return data;
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authData: JSON.parse(localStorage.getItem('profile')),
  },
  reducers: {
    logoutAction: (state) => {
      localStorage.clear();
      state.authData = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(signUp.fulfilled, (state, action) => {
      localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
      state.authData = action.payload;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
      state.authData = action.payload;
    });
  },
});

export const { logoutAction } = authSlice.actions;

export default authSlice.reducer;

export const selectUser = state => state.auth.authData;



