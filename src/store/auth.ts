import { createSlice } from '@reduxjs/toolkit';

interface AuthState {}

const initialState: AuthState = {};

export const profileSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

export default profileSlice.reducer;
