import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './profile';
import authReducer from './auth';
import { profileApi } from './profile-api';
import { accountApi } from './account-api';
import { feedApi } from './feed-api';

const store = configureStore({
  reducer: {
    profile: profileReducer,
    auth: authReducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
    [feedApi.reducerPath]: feedApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      profileApi.middleware,
      accountApi.middleware,
      feedApi.middleware
    ),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
