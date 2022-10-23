import { createSlice } from '@reduxjs/toolkit';
import { ServerToClientMessage } from '../../../server/chat-socket/socket-types';
import fetchMoreMessages from './asyncThunks/fetchMoreMessages';
import refetchMessages from './asyncThunks/refetchMessages';
import initUser from './initUser';
import addMessage from './reducers/addMessage';
import awaitMessage from './reducers/awaitMessage';
import updateMessage from './reducers/updateMessage';
import { fetchingStatus, pageSize } from './status';

export interface AwaitingMessage {
  ref: string;
  fromId: string;
  toId: string;
  content: string;
}

export interface UserWrapper {
  id: string;
  status: 'error' | 'loading' | 'idle';
  isComplete: boolean;
  count: number;
  messages: {
    entities: { [id: string]: ServerToClientMessage };
    ids: string[];
    list: ServerToClientMessage[];
  };
  awaitingMessages: AwaitingMessage[];
}

export interface MessagesState {
  userEntities: { [id: string]: UserWrapper };
}

const initialState: MessagesState = {
  userEntities: {},
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage,
    updateMessage,
    awaitMessage,
    clearAll(state) {
      state.userEntities = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMoreMessages.pending, (state, action) => {
      initUser(state, action.meta.arg);
      if (!state.userEntities[action.meta.arg].isComplete)
        state.userEntities[action.meta.arg].status = 'loading';
    });
    builder.addCase(fetchMoreMessages.rejected, (state, action) => {
      state.userEntities[action.meta.arg].status = 'error';
    });
    builder.addCase(fetchMoreMessages.fulfilled, (state, action) => {
      if (fetchingStatus.dumpSession || action.payload === 'canceled') {
        fetchingStatus.dumpSession = false;
        return;
      }
      const user = state.userEntities[action.meta.arg];
      user.status = 'idle';
      user.count += action.payload.length;
      user.isComplete = action.payload.length < pageSize;
      user.messages.list = action.payload.concat(user.messages.list);
      user.messages.ids = action.payload
        .map((message) => message._id)
        .concat(user.messages.ids);
      action.payload.forEach((message) => {
        user.messages.entities[message._id] = message;
      });
    });
    builder.addCase(refetchMessages.pending, (state, action) => {
      initUser(state, action.meta.arg);
      state.userEntities[action.meta.arg].status = 'loading';
    });
    builder.addCase(refetchMessages.rejected, (state, action) => {
      state.userEntities[action.meta.arg].status = 'error';
    });
    builder.addCase(refetchMessages.fulfilled, (state, action) => {
      const user = state.userEntities[action.meta.arg];
      user.status = 'idle';
      user.messages.list = action.payload;
      user.messages.ids = action.payload
        .map((message) => message._id)
        .concat(user.messages.ids);
      action.payload.forEach((message) => {
        user.messages.entities[message._id] = message;
      });
    });
  },
});

const messagesReducer = messagesSlice.reducer;

export const messagesActions = messagesSlice.actions;

export const messagesActionsThunks = { fetchMoreMessages, refetchMessages };

export default messagesReducer;
