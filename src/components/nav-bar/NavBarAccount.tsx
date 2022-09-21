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
import { useGetAccountDataQuery } from '../../store/account-api';
import { useAppSelector } from '../../store/hooks';
import HeroIcon from '../chakra-ui/HeroIcon';
import ThemeToggle from './ThemeToggle';

interface Props {}

const NavBarAccount: React.FC<Props> = () => {
  const { data, error, isLoading } = useGetAccountDataQuery();

  const user = data;

  // const user = useAppSelector((state) => state.auth.user);

  const fullName = user?.fullName;
  const avatarSrc = user?.avatarSrc;

  const AccountBarJSX = (
    <Popover>
      <PopoverTrigger>
        <Avatar as="button" name={fullName} src={avatarSrc} />
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
            >
              Log out
            </Button>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );

  return (
    <Flex direction="row-reverse" alignItems="center" px={4} gap={4}>
      {user && AccountBarJSX}
      <ThemeToggle />
    </Flex>
  );
};

export default NavBarAccount;
