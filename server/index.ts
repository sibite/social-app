import express from 'express';
import authRouter from './auth/authRouter';

const PORT = 4000;

const app = express();
const router = express.Router();

router.use(express.json());
router.use('/auth', authRouter);

app.use('/api', router);

app.listen(PORT, () => console.log(`App running on http://localhost:${PORT}`));
