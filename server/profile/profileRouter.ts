import express from 'express';
import authenticate from '../auth/authenticate';
import getProfile from './getProfile';
import searchProfiles from './searchProfiles';
import toggleFollow from './toggleFollow';

const profileRouter = express.Router();

profileRouter.get('/:profileId', getProfile);
profileRouter.get('/search/:query', searchProfiles);
profileRouter.patch('/follow/:profileId', authenticate, toggleFollow);

export default profileRouter;
