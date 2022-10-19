import { Flex } from '@chakra-ui/react';
import React from 'react';
import InteractiveContent from '../misc/InteractiveContent';
import MessageBubble from './MessageBubble';
import MessageMenu from './MessageMenu';

interface Props {
  messageId: string;
  isDirectionTo: boolean;
  isDeleted: boolean;
  toId: string;
  content: string;
  dateString: string;
}

const Message: React.FC<Props> = ({
  messageId,
  isDirectionTo,
  isDeleted,
  toId,
  content,
  dateString,
}) => {
  const containerStyle = {
    '&:hover .toolbar': {
      opacity: 1,
    },
  };

  return (
    <Flex sx={containerStyle} gap={2}>
      {isDirectionTo && !isDeleted && (
        <MessageMenu profileId={toId} messageId={messageId} />
      )}
      <MessageBubble
        colored={!isDirectionTo}
        isDeleted={isDeleted}
        dateString={dateString}
        isDirectionTo={isDirectionTo}
      >
        <InteractiveContent textContent={content} />
      </MessageBubble>
    </Flex>
  );
};
export default React.memo(Message);
