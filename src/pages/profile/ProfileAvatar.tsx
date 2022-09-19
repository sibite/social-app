import {
  Center,
  Avatar,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { PencilIcon } from '@heroicons/react/outline';
import HeroIcon from '../../components/chakra-ui/HeroIcon';

interface Props {
  name?: string;
  avatarSrc?: string;
  isEditing?: boolean;
}

const ProfileAvatar: React.FC<Props> = ({
  name = 'User',
  avatarSrc,
  isEditing,
}) => {
  const borderColor = useColorModeValue('light.200', 'gray.700');

  const avatarStyle = {
    position: 'absolute',
    bottom: 0,
    borderWidth: 5,
    borderColor,
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.14)',
  };

  const buttonStyle = {
    color: 'initial',
    position: 'absolute',
    borderRadius: 'full',
    right: '0%',
    bottom: '0%',
  };

  return (
    <Center width="100%" height="50px" position="relative">
      <Avatar
        src={avatarSrc}
        size={['2xl', '2xl', '3xl']}
        name={name}
        sx={avatarStyle}
      >
        {isEditing && (
          <IconButton
            aria-label="Edit profile picture"
            icon={<HeroIcon as={PencilIcon} />}
            colorScheme="plainGray"
            variant="solid"
            size="md"
            sx={buttonStyle}
          />
        )}
      </Avatar>
    </Center>
  );
};
export default ProfileAvatar;
