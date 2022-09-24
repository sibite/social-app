import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreatePostType } from '../../server/api-types/feed';
import prepareAuthHeader from './prepare-auth-header';

export const feedApi = createApi({
  reducerPath: 'feedApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/feed',
    prepareHeaders: prepareAuthHeader,
  }),
  endpoints: (builder) => ({
    createPost: builder.query<any, CreatePostType>({
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
    }),
  }),
});

export const { useCreatePostQuery } = feedApi;
