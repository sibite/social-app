import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  CommentIncomingType,
  CreatePostType,
  PostIncomingType,
} from '../../server/api-types/feed';
import prepareAuthHeader from './prepare-auth-header';

export const feedApi = createApi({
  reducerPath: 'feedApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/feed',
    prepareHeaders: prepareAuthHeader,
  }),
  tagTypes: ['Post', 'Comments'],
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
      invalidatesTags: [{ type: 'Post', id: 'ALL' }],
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
      invalidatesTags: (_result, _err, arg) => [
        { type: 'Post', id: 'ALL' },
        { type: 'Post', id: arg.postId },
      ],
    }),
    createComment: builder.mutation<
      unknown,
      { postId: string; content: string }
    >({
      query: ({ postId, content }) => ({
        url: `comments/${postId}`,
        method: 'POST',
        body: { content },
      }),
      invalidatesTags: (_result, _err, arg) => [
        { type: 'Comments', id: arg.postId },
        { type: 'Post', id: arg.postId },
      ],
    }),
    deleteComment: builder.mutation<
      unknown,
      { postId: string; commentId: string }
    >({
      query: ({ commentId }) => ({
        url: `comments/${commentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _err, arg) => [
        { type: 'Comments', id: arg.postId },
        { type: 'Post', id: arg.postId },
      ],
    }),
    getComments: builder.query<CommentIncomingType[], string>({
      query: (postId) => `comments/${postId}`,
      providesTags: (_result, _err, arg) => [{ type: 'Comments', id: arg }],
    }),
    toggleLike: builder.mutation<unknown, string>({
      query: (postId) => ({
        url: `post/${postId}/like`,
        method: 'PATCH',
      }),
      invalidatesTags: (_result, _err, arg) => [{ type: 'Post', id: arg }],
    }),
    getTotalFeed: builder.query<string[], void>({
      query: () => ({
        url: 'total',
        method: 'GET',
      }),
      providesTags: [{ type: 'Post', id: 'ALL' }],
    }),
    getProfileFeed: builder.query<string[], string>({
      query: (profileId) => ({
        url: profileId,
        method: 'GET',
      }),
      providesTags: [{ type: 'Post', id: 'ALL' }],
    }),
    getPost: builder.query<PostIncomingType, string>({
      query: (postId) =>
        postId && {
          url: `post/${postId}`,
          method: 'GET',
        },
      providesTags: (result, _err, arg) => {
        const affectingTags: { type: 'Post'; id: string }[] = [
          { type: 'Post', id: arg },
        ];
        if (result) {
          affectingTags.push(
            ...result.media.map(({ _id }): { type: 'Post'; id: string } => ({
              type: 'Post',
              id: _id,
            }))
          );
        }
        return affectingTags;
      },
    }),
  }),
});

export const {
  useCreatePostMutation,
  useDeletePostMutation,
  useToggleLikeMutation,
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useGetCommentsQuery,
  useGetTotalFeedQuery,
  useGetProfileFeedQuery,
  useGetPostQuery,
} = feedApi;
