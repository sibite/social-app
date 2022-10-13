import {
  Avatar,
  Circle,
  Flex,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useGetProfileQuery } from '../../store/profile-api';

interface Props {
  profileId: string;
  unread?: boolean;
  onSelect?: Function;
}

const Contacts: React.FC<Props> = ({
  profileId,
  unread = false,
  onSelect = () => null,
}) => {
  const { currentData: contact } = useGetProfileQuery(profileId);
  const bgColor = useColorModeValue('gray.100', 'gray.900');
  const activeColor = useColorModeValue('gray.200', 'gray.800');

  const style = {
    alignItems: 'center',
    w: 'full',
    p: 3,
    borderRadius: 8,
    '&:hover': {
      bgColor,
    },
    '&:active': {
      bgColor: activeColor,
    },
    transition: 'all 200ms',
  };

  const headingStyle = {
    fontWeight: unread ? 'medium' : 'normal',
    flexGrow: '1',
    textAlign: 'left',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    py: 2,
  };

  const clickHandler = () => onSelect();

  return (
    <Flex
      as={Link}
      sx={style}
      onClick={clickHandler}
      to={`/messages/${profileId}`}
    >
      <Avatar
        size="md"
        src={contact?.avatarSrc}
        name={contact?.avatarSrc ? undefined : contact?.fullName}
        mr={3}
      />
      <Heading as="h2" size="sm" sx={headingStyle}>
        {contact?.fullName}
      </Heading>
      {unread && <Circle background="blue.400" size={3} />}
    </Flex>
  );
};

export default Contacts;
