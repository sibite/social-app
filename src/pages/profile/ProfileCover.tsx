import {
  AspectRatio,
  LightMode,
  IconButton,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import { PencilIcon } from '@heroicons/react/outline';
import HeroIcon from '../../components/chakra-ui/HeroIcon';

interface Props {
  isEditing?: boolean;
}

const ProfileCover: React.FC<Props> = ({ isEditing = false }) => {
  const bgColor = useColorModeValue('gray.100', 'gray.800');

  const boxStyle = {
    width: '100%',
    bgColor,
    borderBottomRadius: 'lg',
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
        {isEditing && (
          <LightMode>
            <IconButton
              aria-label="Edit profile picture"
              icon={<HeroIcon as={PencilIcon} />}
              colorScheme="translucent"
              variant="solid"
              size="md"
              sx={buttonStyle}
            />
          </LightMode>
        )}
      </Box>
    </AspectRatio>
  );
};
export default ProfileCover;
