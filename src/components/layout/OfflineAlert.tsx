import {
  HStack,
  IconButton,
  Portal,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { ExclamationIcon, XIcon } from '@heroicons/react/solid';
import { useContext, useEffect } from 'react';
import useMobileModeValue from '../../hooks/useIsMobile';
import useNetworkStatus from '../../hooks/useNetworkStatus';
import PortalRefContext from '../../store/ref-context';
import HeroIcon from '../chakra-ui/HeroIcon';

const OfflineAlert: React.FC = () => {
  const isOnline = useNetworkStatus();
  const portalRef = useContext(PortalRefContext);
  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: true });
  const toast = useToast({
    id: 'online',
    status: 'success',
    title: 'Connection restored',
    duration: 2500,
    position: useMobileModeValue('top', 'bottom'),
  });

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!isOnline) {
      const handler = () => toast.isActive('online') || toast();
      window.addEventListener('online', handler);
      return () => {
        window.removeEventListener('online', handler);
      };
    }
    onOpen();
  }, [isOnline, toast, onOpen]);

  if (isOnline) {
    return null;
  }

  return isOpen ? (
    <Portal containerRef={portalRef}>
      <HStack
        spacing={1}
        px={1}
        pl={2}
        py={1}
        backgroundColor="yellow.300"
        borderRadius={4}
        color="black"
        position="absolute"
        top="15px"
        left="50%"
        transform="translateX(-50%)"
        flexWrap="nowrap"
        fontSize="md"
        fontWeight="bold"
        boxShadow="0 2px 4px rgba(0,0,0,0.1)"
        zIndex="2"
        pointerEvents="auto"
      >
        <HeroIcon as={ExclamationIcon} />
        <Text fontSize="sm">Offline mode</Text>
        <IconButton
          icon={<HeroIcon as={XIcon} />}
          aria-label="close"
          variant="ghost"
          size="sm"
          color="black"
          onClick={onClose}
        />
      </HStack>
      {/* <Center mt={4}>
        <Alert
          status="warning"
          variant="solid"
          width="auto"
          pointerEvents="auto"
        >
          <AlertIcon />
          <AlertTitle>Offline mode</AlertTitle>
          <CloseButton />
        </Alert>
      </Center> */}
    </Portal>
  ) : null;
};
export default OfflineAlert;
