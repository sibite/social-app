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
import { useAppSelector } from '../../store/hooks';
import HeroIcon from '../chakra-ui/HeroIcon';
import ThemeToggle from './ThemeToggle';

interface Props {}

const NavBarAccount: React.FC<Props> = () => {
  const { avatarSrc, name } = useAppSelector((state) => state.profile);

  return (
    <Flex direction="row-reverse" alignItems="center" px={4} gap={4}>
      <Popover>
        <PopoverTrigger>
          <Avatar as="button" name={name} src={avatarSrc} />
        </PopoverTrigger>
        <PopoverContent mt={3} mr={3}>
          <PopoverArrow />
          <PopoverHeader>
            <Flex alignItems="center" gap={3}>
              <Avatar name={name} src={avatarSrc} />
              <Heading as="span" size="md">
                {name}
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
      <ThemeToggle />
    </Flex>
  );
};

export default NavBarAccount;
