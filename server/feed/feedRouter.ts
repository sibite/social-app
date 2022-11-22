import express from 'express';
import fileUpload from 'express-fileupload';
import authenticate, { authenticateSoft } from '../auth/authenticate';
import config from '../config/config';
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
    limits: { fileSize: config.FILE_SIZE_LIMIT },
  })
);

feedRouter.get('/total', authenticate, getTotalFeed);
feedRouter.get('/:profileId', authenticateSoft, getProfileFeed);
feedRouter.get('/media/:profileId', authenticateSoft, getProfileMedia);
feedRouter.post('/', authenticate, createPost);
feedRouter.get('/post/:postId', authenticateSoft, getPost);
feedRouter.delete('/post/:postId', authenticate, deletePost);
feedRouter.patch('/post/:postId/like', authenticate, togglePostLike);
feedRouter.post('/comments/:postId', authenticate, createComment);
feedRouter.get('/comments/:postId', authenticateSoft, getComments);
feedRouter.delete('/comments/:commentId', authenticate, deleteComment);

export default feedRouter;
