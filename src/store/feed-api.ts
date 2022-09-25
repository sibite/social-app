import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  CreatePostType,
  PostIncomingType,
  PostDBType,
} from '../../server/api-types/feed';
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
    deletePost: builder.mutation<
      unknown,
      { postId: string; withMedia: boolean }
    >({
      query: ({ postId, withMedia }) => ({
        url: `post/${postId}`,
        method: 'DELETE',
        body: { withMedia },
      }),
      invalidatesTags: ['Post'],
    }),
    toggleLike: builder.mutation<unknown, string>({
      query: (postId) => ({
        url: `post/${postId}/like`,
        method: 'PATCH',
      }),
      invalidatesTags: (_result, _err, arg) => [{ type: 'Post', id: arg }],
    }),
    getProfileFeed: builder.query<string[], string>({
      query: (profileId) => ({
        url: profileId,
        method: 'GET',
      }),
      providesTags: ['Post'],
    }),
    getPost: builder.query<PostIncomingType, string>({
      query: (postId) => ({
        url: `post/${postId}`,
        method: 'GET',
      }),
      providesTags: (_result, _err, arg) => [{ type: 'Post', id: arg }],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useDeletePostMutation,
  useToggleLikeMutation,
  useGetProfileFeedQuery,
  useGetPostQuery,
} = feedApi;
