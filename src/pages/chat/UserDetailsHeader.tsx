import { Flex, Heading, IconButton } from '@chakra-ui/react';
import { ArrowLeftIcon } from '@heroicons/react/outline';
import HeroIcon from '../../components/chakra-ui/HeroIcon';

interface Props {
  onToggleUserDetails: React.MouseEventHandler;
}

const UserDetailsHeader: React.FC<Props> = ({ onToggleUserDetails }) => {
  const style = {
    w: 'full',
    h: 'full',
    px: 3,
  };

  return (
    <Flex alignItems="center" sx={style} gap={4}>
      <IconButton
        aria-label="Go back"
        icon={<HeroIcon as={ArrowLeftIcon} />}
        onClick={onToggleUserDetails}
      />
      <Heading as="h1" size="md">
        Details
      </Heading>
    </Flex>
  );
};

export default UserDetailsHeader;
