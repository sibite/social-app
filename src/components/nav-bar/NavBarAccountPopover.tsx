import {
  Avatar,
  Button,
  Flex,
  Heading,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
} from '@chakra-ui/react';
import { CogIcon, LogoutIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';
import HeroIcon from '../chakra-ui/HeroIcon';
import AvatarConnectionStatus from './AvatarConnectionStatus';

interface Props {
  user: { avatarSrc?: string; fullName?: string };
}

const NavBarAccountPopover: React.FC<Props> = ({ user }) => {
  const { avatarSrc, fullName } = user;

  const logOut = useLogout();
  const { isOpen, onClose, onToggle } = useDisclosure();

  return (
    <Popover isOpen={isOpen} onClose={onClose}>
      <PopoverTrigger>
        <Avatar
          as="button"
          name={avatarSrc ? undefined : fullName}
          src={avatarSrc}
          position="relative"
          onClick={onToggle}
        >
          <AvatarConnectionStatus />
        </Avatar>
      </PopoverTrigger>
      <PopoverContent mt={3} mr={3}>
        <PopoverArrow />
        <PopoverHeader>
          <Flex alignItems="center" gap={3}>
            <Avatar name={fullName} src={avatarSrc} />
            <Heading as="span" size="md">
              {fullName}
            </Heading>
          </Flex>
        </PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>
          <Flex direction="column">
            <Button
              as={Link}
              to="/settings"
              onClick={onClose}
              leftIcon={<HeroIcon as={CogIcon} />}
              variant="ghost"
              justifyContent="flex-start"
            >
              Settings
            </Button>

            <Button
              leftIcon={<HeroIcon as={LogoutIcon} />}
              variant="ghost"
              justifyContent="flex-start"
              onClick={logOut}
            >
              Log out
            </Button>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
export default NavBarAccountPopover;
