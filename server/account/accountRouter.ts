import express from 'express';
import authenticate from '../shared/authenticate';
import me from './me';

const accountRouter = express.Router();

accountRouter.get('/me', authenticate, me);

export default accountRouter;
