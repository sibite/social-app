import type { UserWrapper } from './messages';

const createInitialEntity = (userId: string): UserWrapper => ({
  id: userId,
  status: 'idle',
  isComplete: false,
  count: 0,
  messages: {
    entities: {},
    ids: [],
    list: [],
  },
  awaitingMessages: [],
});

export default createInitialEntity;
