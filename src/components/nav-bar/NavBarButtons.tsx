import { Center } from '@chakra-ui/react';
import { ChatAlt2Icon, HomeIcon, UserIcon } from '@heroicons/react/outline';
import NavButton from './NavButton';

interface Props {}

const NavBarButtons: React.FC<Props> = () => (
  <Center>
    <NavButton icon={HomeIcon} route="#">
      Feed
    </NavButton>
    <NavButton icon={ChatAlt2Icon} route="/messages">
      Chats
    </NavButton>
    <NavButton icon={UserIcon} route="/profile">
      Me
    </NavButton>
  </Center>
);

export default NavBarButtons;
