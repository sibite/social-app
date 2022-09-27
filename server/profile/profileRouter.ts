import express from 'express';
import getProfile from './getProfile';
import searchProfiles from './searchProfiles';

const profileRouter = express.Router();

profileRouter.get('/:profileId', getProfile);
profileRouter.get('/search/:query', searchProfiles);

export default profileRouter;
