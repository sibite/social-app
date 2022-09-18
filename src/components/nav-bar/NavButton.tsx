import { Button, Text, useColorModeValue } from '@chakra-ui/react';
import { Link, useMatch } from 'react-router-dom';
import HeroIcon from '../chakra-ui/HeroIcon';

interface Props {
  route: string;
  icon?: React.FC;
  children: React.ReactNode;
}

const NavButton: React.FC<Props> = ({ icon, route, children }) => {
  const style = {};

  const isActive = useMatch(`${route}/*`);

  const activeBgColor = useColorModeValue('blue.50', 'gray.800');
  const activeColor = 'blue.500';

  return (
    <Button
      as={Link}
      to={route}
      variant="ghost"
      style={style}
      leftIcon={
        <HeroIcon
          as={icon}
          inButton
          color={isActive ? activeColor : 'initial'}
        />
      }
      bgColor={isActive ? activeBgColor : 'default'}
      height="calc(100% - 16px)"
      m={2}
    >
      <Text fontSize="md" color={isActive ? activeColor : 'initial'}>
        {children}
      </Text>
    </Button>
  );
};

export default NavButton;
