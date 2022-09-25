import express from 'express';
import fileUpload from 'express-fileupload';
import authenticate from '../auth/authenticate';
import { FILE_SIZE_LIMIT } from '../env';
import createPost from './createPost';
import deletePost from './deletePost';
import getPost from './getPost';
import getProfileFeed from './getProfileFeed';

const feedRouter = express.Router();

feedRouter.use(
  fileUpload({
    limits: { fileSize: FILE_SIZE_LIMIT },
  })
);

feedRouter.get('/:profileId', authenticate, getProfileFeed);
feedRouter.post('/', authenticate, createPost);
feedRouter.get('/post/:postId', authenticate, getPost);
feedRouter.delete('/post/:postId', authenticate, deletePost);

export default feedRouter;
