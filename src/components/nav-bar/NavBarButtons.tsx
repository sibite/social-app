import { Center } from '@chakra-ui/react';
import { ChatAlt2Icon, HomeIcon, UserIcon } from '@heroicons/react/outline';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';
import { useAppSelector } from '../../store/hooks';
import NavButton from './NavButton';

interface Props {}

const NavBarButtons: React.FC<Props> = () => {
  const isAuthenticated = useIsAuthenticated();
  const myId = useAppSelector((state) => state.auth.userId);

  if (!isAuthenticated) return <Center />;

  return (
    <Center>
      <NavButton icon={HomeIcon} route="/feed">
        Feed
      </NavButton>
      <NavButton icon={ChatAlt2Icon} route="/messages">
        Chats
      </NavButton>
      <NavButton icon={UserIcon} route={`/profile/${myId}`}>
        Me
      </NavButton>
    </Center>
  );
};

export default NavBarButtons;
