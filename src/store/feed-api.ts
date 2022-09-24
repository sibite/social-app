import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreatePostType } from '../../server/api-types/feed';
import prepareAuthHeader from './prepare-auth-header';

export const feedApi = createApi({
  reducerPath: 'feedApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/feed',
    prepareHeaders: prepareAuthHeader,
  }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    createPost: builder.mutation<unknown, CreatePostType>({
      query: (payload) => {
        const formData = new FormData();

        payload.media.forEach((file, id) => {
          formData.append(`media`, file);
        });

        formData.append('content', payload.content);

        return {
          url: '',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['Post'],
    }),
  }),
});

export const { useCreatePostMutation } = feedApi;
