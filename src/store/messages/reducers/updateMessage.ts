import { ServerToClientMessage } from '../../../../server/chat-socket/socket-types';
import initUser from '../initUser';
import type { MessagesState } from '../messages';

const updateMessage = (
  state: MessagesState,
  action: {
    type: string;
    payload: { userId: string; message: ServerToClientMessage };
  }
) => {
  const { userId, message } = action.payload;
  initUser(state, userId);
  const userMessages = state.userEntities[userId].messages;
  const indexOfMessage = userMessages.ids.indexOf(message._id);
  if (indexOfMessage === -1) return state;
  userMessages.entities[message._id] = message;
  userMessages.list[indexOfMessage] = message;
  return state;
};

export default updateMessage;
