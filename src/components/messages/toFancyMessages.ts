import { ServerToClientMessage } from '../../../server/chat-socket/socket-types';
import { AwaitingMessage } from '../../store/messages';

export interface FancyMessagesGroup {
  date?: number;
  id: string | number;
  fromId: string;
  messages: (ServerToClientMessage | AwaitingMessage)[];
}

const bigTimeGap = 60e3 * 15;
const moderateTimeGap = 60e3 * 3;

const toFancyMessages = (
  messages: ServerToClientMessage[],
  awaitingMessages: AwaitingMessage[]
) => {
  const fancyMessages: FancyMessagesGroup[] = [];

  const appendAsClose = (message: ServerToClientMessage | AwaitingMessage) => {
    fancyMessages[0].messages.push(message);
  };

  const appendAsModerate = (
    message: ServerToClientMessage | AwaitingMessage
  ) => {
    fancyMessages.unshift({
      id: '_id' in message ? message._id : message.ref,
      fromId: message.fromId,
      messages: [message],
    });
  };

  const appendAsSeperate = (
    message: ServerToClientMessage | AwaitingMessage
  ) => {
    fancyMessages.unshift({
      id: '_id' in message ? message._id : message.ref,
      date: 'date' in message ? message.date : Date.now(),
      fromId: message.fromId,
      messages: [message],
    });
  };

  let prevDate = -Infinity;
  let prevFromId = '';

  (messages as FancyMessagesGroup['messages'])
    .concat(awaitingMessages)
    .forEach((message) => {
      const date = 'date' in message ? message.date : Date.now();
      const isSenderTheSame = prevFromId === message.fromId;
      const isCloseInTime = date - prevDate < moderateTimeGap;
      const isModerateInTime = date - prevDate < bigTimeGap;

      if (!isModerateInTime) appendAsSeperate(message);
      else if (!isSenderTheSame) appendAsModerate(message);
      else if (isCloseInTime) appendAsClose(message);
      else appendAsModerate(message);

      prevDate = date;
      prevFromId = message.fromId;
    });

  return fancyMessages;
};

export default toFancyMessages;
