import {
  AspectRatio,
  Box,
  IconButton,
  Image,
  LightMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { PencilIcon } from '@heroicons/react/outline';
import HeroIcon from '../../components/chakra-ui/HeroIcon';
import CustomFilePicker from '../../components/misc/CustomFilePicker';

interface Props {
  coverSrc?: string;
  isEditing?: boolean;
  isUploading?: boolean;
  onChange?: (avatar: Blob) => any;
}

const ProfileCover: React.FC<Props> = ({
  coverSrc,
  isEditing = false,
  isUploading = false,
  onChange,
}) => {
  const coverChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCoverFile =
      event.currentTarget.files && event.currentTarget.files[0];
    if (newCoverFile && onChange) {
      onChange(newCoverFile);
    }
  };

  const bgColor = useColorModeValue('gray.100', 'gray.800');

  const boxStyle = {
    width: '100%',
    bgColor,
    borderBottomRadius: 'xl',
    position: 'relative',
  };

  const buttonStyle = {
    position: 'absolute',
    right: 2,
    bottom: 2,
  };

  return (
    <AspectRatio width="100%" ratio={3}>
      <Box sx={boxStyle}>
        {coverSrc && (
          <Image src={coverSrc} width="100%" height="100%" objectFit="cover" />
        )}
        {isEditing && (
          <LightMode>
            <CustomFilePicker
              onChange={coverChangeHandler}
              accept="image/png, image/jpeg, image/webp, image/gif"
              capture="environment"
            >
              <IconButton
                aria-label="Edit profile picture"
                icon={<HeroIcon as={PencilIcon} />}
                colorScheme="translucent"
                variant="solid"
                size="md"
                sx={buttonStyle}
                disabled={isUploading}
              />
            </CustomFilePicker>
          </LightMode>
        )}
      </Box>
    </AspectRatio>
  );
};
export default ProfileCover;
