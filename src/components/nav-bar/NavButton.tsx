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
  children: React.ReactNode;
}

const NavButton: React.FC<Props> = ({ icon, route, children }) => {
  const isActive = useMatch(`${route}/*`);

  const activeBgColor = useColorModeValue('blue.50', 'gray.800');
  const activeColor = useColorModeValue('blue.500', 'blue.300');

  const isTextShown = useBreakpointValue({ base: false, md: true });

  const style = {
    bgColor: isActive ? activeBgColor : 'default',
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
      leftIcon={
        <HeroIcon
          as={icon}
          inButton
          color={isActive ? activeColor : 'initial'}
        />
      }
    >
      {isTextShown && (
        <Text fontSize="md" color={isActive ? activeColor : 'initial'}>
          {children}
        </Text>
      )}
    </Button>
  );
};

export default NavButton;
