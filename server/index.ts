import express from 'express';
import { createServer } from 'http';
import path from 'path';
import accountRouter from './account/accountRouter';
import authRouter from './auth/authRouter';
import createSocketIO from './chat-socket/socket-server';
import config from './config/config';
import feedRouter from './feed/feedRouter';
import messagesRouter from './messages/messagesRouter';
import profileRouter from './profile/profileRouter';

const app = express();
const router = express.Router();
const httpServer = createServer(app);

router.use(express.json());
router.use(
  '/uploads',
  express.static(path.join(__dirname, '../database/uploads'), {
    fallthrough: false,
  })
);
router.use('/auth', authRouter);
router.use('/account', accountRouter);
router.use('/profile', profileRouter);
router.use('/feed', feedRouter);
router.use('/messages', messagesRouter);

app.use(config.API_URL, router);

app.use(express.static(path.join(__dirname, '../public')));
app.get('/*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

createSocketIO(httpServer);

httpServer.listen(config.PORT, () =>
  console.log(`App running on http://localhost:${config.PORT}`)
);
