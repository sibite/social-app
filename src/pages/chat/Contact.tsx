import {
  Avatar,
  Circle,
  Flex,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';

interface Props {
  name?: string;
  avatar?: string;
  unread?: boolean;
  onSelect?: Function;
}

const Contacts: React.FC<Props> = ({
  name = 'User',
  avatar,
  unread = false,
  onSelect = () => null,
}) => {
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
    <Flex sx={style} as="button" onClick={clickHandler}>
      <Avatar size="md" src={avatar} name={name} mr={3} />
      <Heading as="h2" size="sm" sx={headingStyle}>
        {name}
      </Heading>
      {unread && <Circle background="blue.400" size={3} />}
    </Flex>
  );
};

export default Contacts;
