import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '.';
import { ServerToClientMessage } from '../../server/chat-socket/socket-types';

interface UserWrapper {
  id: string;
  status: 'error' | 'loading' | 'idle';
  isComplete: boolean;
  count: number;
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

const numOfFetchedInOneReq = 50;

const createInitialEntity = (userId: string): UserWrapper => ({
  id: userId,
  status: 'idle',
  isComplete: false,
  count: 0,
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
let dumpFetchSession = false;

const fetchMoreMessages = createAsyncThunk<
  ServerToClientMessage[] | 'canceled',
  string
>('messages/fetchMore', async (userId: string, { getState }) => {
  if (isFetching) return 'canceled';
  const state = getState() as RootState;
  const { token } = state.auth;
  const user =
    state.messages.userEntities[userId] ?? createInitialEntity(userId);
  if (user.isComplete) return [];
  isFetching = true;
  const from = user.messages.list.length;
  const to = from + numOfFetchedInOneReq - 1;
  const request = await axios.get(`/api/messages/${userId}/${from}-${to}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  isFetching = false;
  return request.data;
});

const refetchMessages = createAsyncThunk<ServerToClientMessage[], string>(
  'messages/refetch',
  async (userId: string, { getState }) => {
    if (isFetching) dumpFetchSession = true;
    isFetching = true;
    const state = getState() as RootState;
    const { token } = state.auth;
    const user =
      state.messages.userEntities[userId] ?? createInitialEntity(userId);
    const from = 0;
    const to = user.count - 1;
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
      state.userEntities[userId].count += 1;
    },
    updateMessage(
      state,
      action: {
        type: string;
        payload: { userId: string; message: ServerToClientMessage };
      }
    ) {
      const { userId, message } = action.payload;
      initUser(state, userId);
      const userMessages = state.userEntities[userId].messages;
      const indexOfMessage = userMessages.ids.indexOf(message._id);
      if (indexOfMessage === -1) return state;
      userMessages.entities[message._id] = message;
      userMessages.list[indexOfMessage] = message;
      return state;
    },
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
      if (dumpFetchSession || action.payload === 'canceled') {
        dumpFetchSession = false;
        return;
      }
      const user = state.userEntities[action.meta.arg];
      user.status = 'idle';
      user.count += action.payload.length;
      user.isComplete = action.payload.length === 0;
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
