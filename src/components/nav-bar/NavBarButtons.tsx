import { Center } from '@chakra-ui/react';
import { ChatAlt2Icon, HomeIcon, UserIcon } from '@heroicons/react/outline';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';
import NavButton from './NavButton';

interface Props {}

const NavBarButtons: React.FC<Props> = () => {
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) return <Center />;

  return (
    <Center>
      <NavButton icon={HomeIcon} route="/feed">
        Feed
      </NavButton>
      <NavButton icon={ChatAlt2Icon} route="/messages">
        Chats
      </NavButton>
      <NavButton icon={UserIcon} route="/profile/me">
        Me
      </NavButton>
    </Center>
  );
};

export default NavBarButtons;
