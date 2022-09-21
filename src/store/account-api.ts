import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserType } from '../../server/api-types/auth';
import type { RootState } from '.';

export const accountApi = createApi({
  reducerPath: 'accountApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/account/',
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).auth;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAccountData: builder.query<UserType, void>({
      query: () => 'me',
    }),
  }),
});

export const { useGetAccountDataQuery } = accountApi;
