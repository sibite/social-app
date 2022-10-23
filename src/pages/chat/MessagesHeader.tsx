import { Avatar, Flex, Heading, IconButton } from '@chakra-ui/react';
import { InformationCircleIcon } from '@heroicons/react/outline';
import HeroIcon from '../../components/chakra-ui/HeroIcon';
import { useGetProfileQuery } from '../../store/profile-api';

interface Props {
  profileId: string;
  onToggleUserDetails: React.MouseEventHandler;
}

const ContactsHeader: React.FC<Props> = ({
  profileId,
  onToggleUserDetails,
}) => {
  const { currentData, isLoading } = useGetProfileQuery(profileId);

  const style = {
    w: 'full',
    h: 'full',
    px: 3,
  };

  if (isLoading) return null;

  return (
    <Flex alignItems="center" sx={style} gap={4}>
      <Avatar
        size="md"
        src={currentData?.avatarSrc}
        name={currentData?.avatarSrc ? undefined : currentData?.fullName}
        key={currentData?.avatarSrc}
      />
      <Heading as="h1" size="md">
        {currentData?.fullName ?? 'User'}
      </Heading>
      <IconButton
        ml="auto"
        aria-label="Toggle user details"
        icon={<HeroIcon as={InformationCircleIcon} />}
        onClick={onToggleUserDetails}
      />
    </Flex>
  );
};

export default ContactsHeader;
