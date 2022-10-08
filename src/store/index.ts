import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import photoViewerReducer from './photo-viewer';
import { profileApi } from './profile-api';
import { accountApi } from './account-api';
import { feedApi } from './feed-api';
import { messagesApi } from './messages-api';

const store = configureStore({
  reducer: {
    auth: authReducer,
    photoViewer: photoViewerReducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
    [feedApi.reducerPath]: feedApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      profileApi.middleware,
      accountApi.middleware,
      feedApi.middleware,
      messagesApi.middleware
    ),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
