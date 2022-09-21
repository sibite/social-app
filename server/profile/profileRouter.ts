import express from 'express';
import getProfile from './getProfile';

const profileRouter = express.Router();

profileRouter.get('/:profileId', getProfile);

export default profileRouter;
