import initUser from '../initUser';
import type { MessagesState } from '../messages';

const awaitMessage = (
  state: MessagesState,
  action: {
    type: string;
    payload: {
      ref: string;
      fromId: string;
      toId: string;
      content: string;
    };
  }
) => {
  const { ref, toId, fromId, content } = action.payload;
  initUser(state, toId);
  const userEntity = state.userEntities[toId];
  userEntity.awaitingMessages.push({ ref, content, fromId, toId });
};
export default awaitMessage;
