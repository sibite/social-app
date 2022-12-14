import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token?: string;
  userId?: string;
}

const initialState: AuthState = {
  token: localStorage.getItem('social-app.auth-token') ?? undefined,
  userId: localStorage.getItem('social-app.user-id') ?? undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn(store, action: PayloadAction<{ userId: string; token: string }>) {
      store.token = action.payload.token;
      store.userId = action.payload.userId;
      localStorage.setItem('social-app.auth-token', action.payload.token);
      localStorage.setItem('social-app.user-id', action.payload.userId);
    },
    logOut() {
      localStorage.removeItem('social-app.auth-token');
      localStorage.removeItem('social-app.user-id');
      return {};
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
