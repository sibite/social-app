import express from 'express';
import fileUpload from 'express-fileupload';
import authenticate from '../auth/authenticate';
import config from '../config/config';
import putAvatar from './avatarPut';
import putCover from './coverPut';
import me from './me';
import patch from './patch';

const accountRouter = express.Router();

accountRouter.use(
  fileUpload({
    limits: { fileSize: config.FILE_SIZE_LIMIT },
  })
);

accountRouter.patch('/', authenticate, patch);
accountRouter.get('/me', authenticate, me);
accountRouter.put('/avatar', authenticate, putAvatar);
accountRouter.put('/cover', authenticate, putCover);

export default accountRouter;
