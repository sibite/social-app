import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import photoViewerReducer from './photo-viewer';
import { profileApi } from './profile-api';
import { accountApi } from './account-api';
import { feedApi } from './feed-api';
import messagesReducer from './messages';
import contactsReducer from './contacts';

const store = configureStore({
  reducer: {
    auth: authReducer,
    photoViewer: photoViewerReducer,
    messages: messagesReducer,
    contacts: contactsReducer,
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
