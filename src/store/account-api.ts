import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserType } from '../../server/api-types/auth';
import prepareAuthHeader from './prepare-auth-header';

interface UpdateArgs
  extends Partial<
    Pick<
      UserType,
      'name' | 'fullName' | 'lastName' | 'birthDate' | 'description'
    >
  > {
  password?: string;
  newPassword?: string;
}

export const accountApi = createApi({
  reducerPath: 'accountApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/account/',
    prepareHeaders: prepareAuthHeader,
  }),
  tagTypes: ['Account'],
  endpoints: (builder) => ({
    getAccountData: builder.query<UserType, void>({
      query: () => 'me',
      keepUnusedDataFor: 0,
      providesTags: ['Account'],
    }),
    uploadAvatar: builder.mutation<void, Blob>({
      query: (file) => {
        const formdata = new FormData();
        formdata.append('avatar', file);
        return {
          url: 'avatar',
          method: 'put',
          body: formdata,
        };
      },
      invalidatesTags: ['Account'],
    }),
    uploadCover: builder.mutation<any, Blob>({
      query: (file) => {
        const formdata = new FormData();
        formdata.append('cover', file);
        return {
          url: 'cover',
          method: 'PUT',
          body: formdata,
        };
      },
      invalidatesTags: ['Account'],
    }),
    updateDetails: builder.mutation<any, UpdateArgs>({
      query: (updatedData) => ({
        url: '',
        method: 'PATCH',
        body: updatedData,
      }),
      invalidatesTags: ['Account'],
    }),
    deleteAccount: builder.mutation<any, string>({
      query: (password) => ({
        url: '',
        method: 'DELETE',
        body: { password },
      }),
    }),
  }),
});

export const {
  useGetAccountDataQuery,
  useUploadAvatarMutation,
  useUploadCoverMutation,
  useUpdateDetailsMutation,
  useDeleteAccountMutation,
} = accountApi;
