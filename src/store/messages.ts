import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '.';
import { ServerToClientMessage } from '../../server/chat-socket/types';

interface UserWrapper {
  id: string;
  status: 'error' | 'loading' | 'idle';
  messages: {
    entities: { [id: string]: ServerToClientMessage };
    ids: string[];
    list: ServerToClientMessage[];
  };
}

interface MessagesState {
  userEntities: { [id: string]: UserWrapper };
}

const initialState: MessagesState = {
  userEntities: {},
};

const numOfFetchedInOneReq = 5000000;

const createInitialEntity = (userId: string): UserWrapper => ({
  id: userId,
  status: 'idle',
  messages: {
    entities: {},
    ids: [],
    list: [],
  },
});

const initUser = (state: MessagesState, userId: string) => {
  if (state.userEntities[userId]) return;
  state.userEntities[userId] = createInitialEntity(userId);
};

let isFetching = false;

const fetchMoreMessages = createAsyncThunk<ServerToClientMessage[], string>(
  'messages/fetchMore',
  async (userId: string, { getState }) => {
    if (isFetching) return [];
    isFetching = true;
    const state = getState() as RootState;
    const { token } = state.auth;
    const user =
      state.messages.userEntities[userId] ?? createInitialEntity(userId);
    const from = user.messages.list.length;
    const to = from + numOfFetchedInOneReq - 1;
    const request = await axios.get(`/api/messages/${userId}/${from}-${to}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    isFetching = false;
    return request.data;
  }
);

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage(
      state,
      action: {
        type: string;
        payload: { userId: string; message: ServerToClientMessage };
      }
    ) {
      const { userId, message } = action.payload;
      initUser(state, userId);
      const userMessages = state.userEntities[userId].messages;
      userMessages.entities[message._id] = message;
      userMessages.ids.push(message._id);
      userMessages.list.push(message);
    },
    clearAll(state) {
      state.userEntities = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMoreMessages.pending, (state, action) => {
      initUser(state, action.meta.arg);
      state.userEntities[action.meta.arg].status = 'loading';
    });
    builder.addCase(fetchMoreMessages.rejected, (state, action) => {
      state.userEntities[action.meta.arg].status = 'error';
    });
    builder.addCase(fetchMoreMessages.fulfilled, (state, action) => {
      const user = state.userEntities[action.meta.arg];
      user.status = 'idle';
      user.messages.list = action.payload.concat(user.messages.list);
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

export const messagesActionsThunks = { fetchMoreMessages };

export default messagesReducer;
