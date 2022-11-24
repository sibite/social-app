import { Circle } from '@chakra-ui/react';
import { ExclamationIcon, WifiIcon } from '@heroicons/react/solid';
import useNetworkStatus from '../../hooks/useNetworkStatus';
import HeroIcon from '../chakra-ui/HeroIcon';

const AvatarConnectionStatus: React.FC = () => {
  const isOnline = useNetworkStatus();

  return isOnline ? null : (
    <Circle
      position="absolute"
      bottom="0px"
      // right="-6px"
      p="3px"
      bgColor="red.500"
      color="white"
      fontSize="xs"
    >
      <HeroIcon as={ExclamationIcon} />
      <HeroIcon as={WifiIcon} />
    </Circle>
  );
};
export default AvatarConnectionStatus;
