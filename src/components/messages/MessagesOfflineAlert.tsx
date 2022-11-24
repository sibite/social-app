import { HStack, Text, useColorModeValue } from '@chakra-ui/react';
import { ExclamationIcon } from '@heroicons/react/solid';
import useNetworkStatus from '../../hooks/useNetworkStatus';
import HeroIcon from '../chakra-ui/HeroIcon';

const MessagesOfflineAlert: React.FC = () => {
  const isOnline = useNetworkStatus();

  const style = {
    spacing: 1,
    px: 2,
    py: 1,
    justifyContent: 'center',
    backgroundColor: useColorModeValue('yellow.300', 'yellow.700'),
    fontSize: 'md',
    fontWeight: 'bold',
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
  };

  if (isOnline) return null;

  return (
    <HStack sx={style}>
      <HeroIcon as={ExclamationIcon} />
      <Text fontSize="sm">Offline mode</Text>
    </HStack>
  );
};
export default MessagesOfflineAlert;
