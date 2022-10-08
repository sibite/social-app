import express from 'express';
import { createServer } from 'http';
import path from 'path';
import accountRouter from './account/accountRouter';
import authRouter from './auth/authRouter';
import createSocketIO from './chat-socket/socket-server';
import feedRouter from './feed/feedRouter';
import messagesRouter from './messages/messagesRouter';
import profileRouter from './profile/profileRouter';

const PORT = 4000;

const app = express();
const router = express.Router();
const httpServer = createServer(app);

router.use(express.json());
router.use('/uploads', express.static(path.join(__dirname, './uploads')));
router.use('/auth', authRouter);
router.use('/account', accountRouter);
router.use('/profile', profileRouter);
router.use('/feed', feedRouter);
router.use('/messages', messagesRouter);

app.use('/api', router);

createSocketIO(httpServer);

httpServer.listen(PORT, () =>
  console.log(`App running on http://localhost:${PORT}`)
);
