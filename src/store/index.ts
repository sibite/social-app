import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './profile';
import authReducer from './auth';

const store = configureStore({
  reducer: {
    profile: profileReducer,
    auth: authReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
