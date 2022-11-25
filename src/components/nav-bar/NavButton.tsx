import {
  Button,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link, useMatch } from 'react-router-dom';
import HeroIcon from '../chakra-ui/HeroIcon';

interface Props {
  route: string;
  icon?: React.FC;
  activeIcon?: React.FC;
  children: React.ReactNode;
}

const NavButton: React.FC<Props> = ({ icon, activeIcon, route, children }) => {
  const isActive = useMatch(`${route}/*`);

  const activeColor = useColorModeValue('blue.500', 'blue.400');

  const isTextShown = useBreakpointValue({ base: false, md: true });

  const style = {
    bgColor: 'default',
    height: 'calc(100% - 16px)',
    m: isTextShown ? 2 : 1,
    paddingRight: isTextShown ? undefined : 0,
    paddingLeft: isTextShown ? undefined : 3,
  };

  return (
    <Button
      as={Link}
      to={route}
      variant="ghost"
      sx={style}
      color={isActive ? activeColor : 'initial'}
      transition="background 200ms"
      leftIcon={
        <HeroIcon as={isActive && activeIcon ? activeIcon : icon} inButton />
      }
    >
      {isTextShown && <Text fontSize="md">{children}</Text>}
    </Button>
  );
};

export default NavButton;
