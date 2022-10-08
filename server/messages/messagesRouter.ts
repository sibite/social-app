import express from 'express';
import authenticate from '../auth/authenticate';
import getMessages from './getMessages';
import getMessagesCount from './getMessagesCount';

const messagesRouter = express.Router();

messagesRouter.get('/:profileId/:from-:to', authenticate, getMessages);
messagesRouter.get('/:profileId/count', authenticate, getMessagesCount);

export default messagesRouter;
