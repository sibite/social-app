import { ArrowRightIcon } from '@chakra-ui/icons';
import { IconButton, HStack } from '@chakra-ui/react';
import AutoResizedTextArea from '../../../shared/components/AutoResizedTextArea';

interface Props {}

const MessagesInput: React.FC<Props> = () => (
  <HStack p={2}>
    <AutoResizedTextArea flexGrow="1" />
    <IconButton icon={<ArrowRightIcon />} aria-label="Send message" />
  </HStack>
);

export default MessagesInput;
