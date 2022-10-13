import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ServerToClientMessage } from '../../server/chat-socket/types';
import prepareAuthHeader from './prepare-auth-header';

export const messagesApi = createApi({
  reducerPath: 'messages',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/messages',
    prepareHeaders: prepareAuthHeader,
  }),
  endpoints: (builder) => ({
    getMessagesCount: builder.query<{ count: number }, string>({
      query: (profileId) => `${profileId}/count`,
      keepUnusedDataFor: 0,
    }),
    getMessages: builder.query<
      ServerToClientMessage[],
      { profileId: string; from: number; to: number }
    >({
      query: ({ profileId, from, to }) => `${profileId}/${from}-${to}`,
    }),
  }),
});

export const { useGetMessagesCountQuery, useGetMessagesQuery } = messagesApi;
