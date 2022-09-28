import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserPublicType } from '../../server/api-types/auth';
import prepareAuthHeader from './prepare-auth-header';

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/profile/',
    prepareHeaders: prepareAuthHeader,
  }),
  tagTypes: ['Profile'],
  endpoints: (builder) => ({
    getProfile: builder.query<UserPublicType, string>({
      query: (id) => String(id),
      providesTags: (_result, _err, arg) => [{ type: 'Profile', id: arg }],
    }),
    searchProfiles: builder.query<UserPublicType[], string>({
      query: (query) => `search/${query}`,
    }),
    toggleFollow: builder.mutation<any, string>({
      query: (profileId) => ({ url: `follow/${profileId}`, method: 'PATCH' }),
      invalidatesTags: (_result, _err, arg) => [{ type: 'Profile', id: arg }],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useSearchProfilesQuery,
  useToggleFollowMutation,
} = profileApi;
