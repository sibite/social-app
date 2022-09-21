import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from '../shared/types/auth';

interface AuthState {
  authToken?: string;
  user?: UserType;
}

const initialState: AuthState = {};

export const profileSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn(store, action: PayloadAction<{ user: UserType; token: string }>) {
      store.authToken = action.payload.token;
      store.user = action.payload.user;
    },
  },
});

export const profileActions = profileSlice.actions;

export default profileSlice.reducer;
