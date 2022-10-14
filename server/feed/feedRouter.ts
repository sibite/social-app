import express from 'express';
import fileUpload from 'express-fileupload';
import authenticate from '../auth/authenticate';
import { FILE_SIZE_LIMIT } from '../env';
import createComment from './createComment';
import getComments from './getComments';
import createPost from './createPost';
import deletePost from './deletePost';
import getPost from './getPost';
import getProfileFeed from './getProfileFeed';
import togglePostLike from './togglePostLike';
import deleteComment from './deleteComment';
import getTotalFeed from './getTotalFeed';
import getProfileMedia from './getProfileMedia';

const feedRouter = express.Router();

feedRouter.use(
  fileUpload({
    limits: { fileSize: FILE_SIZE_LIMIT },
  })
);

feedRouter.get('/total', authenticate, getTotalFeed);
feedRouter.get('/:profileId', authenticate, getProfileFeed);
feedRouter.get('/media/:profileId', authenticate, getProfileMedia);
feedRouter.post('/', authenticate, createPost);
feedRouter.get('/post/:postId', authenticate, getPost);
feedRouter.delete('/post/:postId', authenticate, deletePost);
feedRouter.patch('/post/:postId/like', authenticate, togglePostLike);
feedRouter.post('/comments/:postId', authenticate, createComment);
feedRouter.get('/comments/:postId', authenticate, getComments);
feedRouter.delete('/comments/:commentId', authenticate, deleteComment);

export default feedRouter;
