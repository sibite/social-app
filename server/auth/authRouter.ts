import express from 'express';
import logIn from './log-in';
import signUp from './sign-up';

const authRouter = express.Router();

authRouter.post('/sign-up', signUp);
authRouter.post('/log-in', logIn);

export default authRouter;
