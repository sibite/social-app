import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../..';
import type { ServerToClientMessage } from '../../../../server/chat-socket/socket-types';
import createInitialEntity from '../createInitialEntity';
import { pageSize, fetchingStatus } from '../status';

const fetchMoreMessages = createAsyncThunk<
  ServerToClientMessage[] | 'canceled',
  string
>(
  'messages/fetchMore',
  async (userId: string, { getState, rejectWithValue }) => {
    if (fetchingStatus.isFetching) return 'canceled';

    const state = getState() as RootState;
    const { token } = state.auth;
    const user =
      state.messages.userEntities[userId] ?? createInitialEntity(userId);

    if (user.isComplete) return [];
    fetchingStatus.isFetching = true;

    const from = user.messages.list.length;
    const to = from + pageSize - 1;

    try {
      const request = await axios.get(`/api/messages/${userId}/${from}-${to}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return request.data;
    } catch {
      rejectWithValue(null);
    } finally {
      fetchingStatus.isFetching = false;
    }
    return Promise.reject();
  }
);

export default fetchMoreMessages;
