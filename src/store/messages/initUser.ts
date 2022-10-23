import createInitialEntity from './createInitialEntity';
import type { MessagesState } from './messages';

const initUser = (state: MessagesState, userId: string) => {
  if (state.userEntities[userId]) return;
  state.userEntities[userId] = createInitialEntity(userId);
};

export default initUser;
