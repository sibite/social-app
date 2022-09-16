import { HStack, IconButton } from '@chakra-ui/react';
import { ChevronDoubleRightIcon } from '@heroicons/react/outline';
import HeroIcon from '../../../components/chakra-ui/HeroIcon';
import AutoResizedTextArea from '../../../shared/components/AutoResizedTextArea';

interface Props {}

const MessagesInput: React.FC<Props> = () => (
  <HStack p={2}>
    <AutoResizedTextArea flexGrow="1" />
    <IconButton
      icon={<HeroIcon as={ChevronDoubleRightIcon} />}
      aria-label="Send message"
    />
  </HStack>
);

export default MessagesInput;
