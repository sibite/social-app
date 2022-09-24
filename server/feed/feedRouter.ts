import express from 'express';
import fileUpload from 'express-fileupload';
import authenticate from '../auth/authenticate';
import { FILE_SIZE_LIMIT } from '../env';
import createPost from './createPost';

const feedRouter = express.Router();

feedRouter.use(
  fileUpload({
    limits: { fileSize: FILE_SIZE_LIMIT },
  })
);

feedRouter.post('/', authenticate, createPost);

export default feedRouter;
