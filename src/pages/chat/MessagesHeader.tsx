import { Avatar, Flex, Heading } from '@chakra-ui/react';
import { useGetProfileQuery } from '../../store/profile-api';

interface Props {
  profileId: string;
}

const ContactsHeader: React.FC<Props> = ({ profileId }) => {
  const { currentData } = useGetProfileQuery(profileId);

  const style = {
    w: 'full',
    h: 'full',
    px: 3,
  };

  if (!currentData) return null;

  return (
    <Flex alignItems="center" sx={style} gap={4}>
      <Avatar
        size="md"
        src={currentData.avatarSrc}
        name={currentData.avatarSrc ? undefined : currentData.fullName}
      />
      <Heading as="h1" size="md">
        {currentData.fullName}
      </Heading>
    </Flex>
  );
};

export default ContactsHeader;
