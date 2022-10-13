import { ServerToClientMessage } from '../../../server/chat-socket/types';

export interface FancyMessagesGroup {
  date?: number;
  fromId: string;
  messages: ServerToClientMessage[];
}

const bigTimeGap = 60e3 * 15;
const moderateTimeGap = 60e3 * 3;

const toFancyMessages = (messages: ServerToClientMessage[]) => {
  const fancyMessages: FancyMessagesGroup[] = [];

  const appendAsClose = (message: ServerToClientMessage) => {
    fancyMessages[0].messages.push(message);
  };

  const appendAsModerate = (message: ServerToClientMessage) => {
    fancyMessages.unshift({
      fromId: message.fromId,
      messages: [message],
    });
  };

  const appendAsSeperate = (message: ServerToClientMessage) => {
    fancyMessages.unshift({
      date: message.date,
      fromId: message.fromId,
      messages: [message],
    });
  };

  let prevDate = -Infinity;
  let prevFromId = '';

  messages.forEach((message) => {
    const isSenderTheSame = prevFromId === message.fromId;
    const isCloseInTime = message.date - prevDate < moderateTimeGap;
    const isModerateInTime = message.date - prevDate < bigTimeGap;

    console.log('isMod', isModerateInTime);

    if (!isModerateInTime) appendAsSeperate(message);
    else if (!isSenderTheSame) appendAsModerate(message);
    else if (isCloseInTime) appendAsClose(message);
    else appendAsModerate(message);

    prevDate = message.date;
    prevFromId = message.fromId;
  });

  return fancyMessages;
};

export default toFancyMessages;
