import { ServerToClientMessage } from '../../../../server/chat-socket/socket-types';
import initUser from '../initUser';
import type { MessagesState } from '../messages';

const addMessage = (
  state: MessagesState,
  action: {
    type: string;
    payload: { userId: string; message: ServerToClientMessage };
  }
) => {
  const { userId, message } = action.payload;
  initUser(state, userId);
  const { messages, awaitingMessages } = state.userEntities[userId];
  if (messages.entities[message._id] === undefined) {
    messages.entities[message._id] = message;
    messages.ids.push(message._id);
    messages.list.push(message);

    state.userEntities[userId].count += 1;
  }

  state.userEntities[userId].awaitingMessages = awaitingMessages.filter(
    (awMessage) => awMessage.ref !== message.ref
  );
};

export default addMessage;
