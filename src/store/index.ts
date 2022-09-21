import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './profile';
import authReducer from './auth';
import { profileApi } from './profile-api';
import { accountApi } from './account-api';

const store = configureStore({
  reducer: {
    profile: profileReducer,
    auth: authReducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
