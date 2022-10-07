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
} from '@chakra-ui/react';
import { CogIcon, LogoutIcon } from '@heroicons/react/outline';
import { useNavigate } from 'react-router-dom';
import { useGetAccountDataQuery } from '../../store/account-api';
import { authActions } from '../../store/auth';
import { useAppDispatch } from '../../store/hooks';
import HeroIcon from '../chakra-ui/HeroIcon';
import ThemeToggle from './ThemeToggle';

interface Props {}

const NavBarAccount: React.FC<Props> = () => {
  const { data } = useGetAccountDataQuery();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logOutHandler = () => {
    dispatch(authActions.logOut());
    navigate('/login');
  };

  const user = data;

  const fullName = user?.fullName;
  const avatarSrc = user?.avatarSrc;

  const AccountBarJSX = (
    <Popover>
      <PopoverTrigger>
        <Avatar
          as="button"
          name={avatarSrc ? undefined : fullName}
          src={avatarSrc}
        />
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
              onClick={logOutHandler}
            >
              Log out
            </Button>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );

  return (
    <Flex direction="row-reverse" alignItems="center" pr={4} gap={4}>
      {user && AccountBarJSX}
      <ThemeToggle />
    </Flex>
  );
};

export default NavBarAccount;
