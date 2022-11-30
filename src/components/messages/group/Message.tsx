import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import InteractiveContent from '../../misc/InteractiveContent';
import MessageBubble from './MessageBubble';
import MessageMenu from './MessageMenu';

interface Props {
  messageId?: string;
  isDirectionTo: boolean;
  isDeleted?: boolean;
  isSending?: boolean;
  toId: string;
  content: string;
  dateString: string;
}

const Message: React.FC<Props> = ({
  messageId,
  isDirectionTo,
  isDeleted,
  isSending,
  toId,
  content,
  dateString,
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const containerStyle = {
    '&:hover .toolbar': {
      opacity: 1,
    },
    flexDirection: isDirectionTo ? 'row' : 'row-reverse',
  };

  return (
    <Flex
      sx={containerStyle}
      gap={2}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      {isDirectionTo && !isDeleted && messageId && isOpen ? (
        <MessageMenu profileId={toId} messageId={messageId} />
      ) : (
        <Box width="32px" flexShrink="0" />
      )}
      <MessageBubble
        colored={!isDirectionTo}
        isDeleted={isDeleted}
        isSending={isSending}
        dateString={dateString}
        isDirectionTo={isDirectionTo}
      >
        <InteractiveContent textContent={content} />
      </MessageBubble>
    </Flex>
  );
};
export default React.memo(Message);
