import {
  Avatar,
  Center,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { PencilIcon } from '@heroicons/react/outline';
import HeroIcon from '../../components/chakra-ui/HeroIcon';
import CustomFilePicker from '../../components/misc/CustomFilePicker';

interface Props {
  name?: string;
  avatarSrc?: string;
  isEditing?: boolean;
  isUploading?: boolean;
  onChange?: (avatar: Blob) => any;
}

const ProfileAvatar: React.FC<Props> = ({
  name,
  avatarSrc,
  isEditing,
  isUploading = false,
  onChange,
}) => {
  const avatarChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAvatarFile =
      event.currentTarget.files && event.currentTarget.files[0];
    if (newAvatarFile && onChange) {
      onChange(newAvatarFile);
    }
  };

  const borderColor = useColorModeValue('gray.50', 'gray.700');

  const avatarStyle = {
    position: 'absolute',
    bottom: 0,
    borderWidth: 4,
    borderColor,
    boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.14)',
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
        name={avatarSrc ? undefined : name}
        sx={avatarStyle}
      >
        {isEditing && (
          <CustomFilePicker
            onChange={avatarChangeHandler}
            accept="image/png, image/jpeg, image/webp, image/gif"
            capture="user"
          >
            <IconButton
              aria-label="Edit profile picture"
              icon={<HeroIcon as={PencilIcon} />}
              colorScheme="plainGray"
              variant="solid"
              size="md"
              sx={buttonStyle}
              disabled={isUploading}
            />
          </CustomFilePicker>
        )}
      </Avatar>
    </Center>
  );
};
export default ProfileAvatar;
