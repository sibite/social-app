import {
  AspectRatio,
  LightMode,
  IconButton,
  Box,
  useColorModeValue,
  Image,
  VisuallyHiddenInput,
} from '@chakra-ui/react';
import { PencilIcon } from '@heroicons/react/outline';
import { useRef, useState } from 'react';
import HeroIcon from '../../components/chakra-ui/HeroIcon';
import { accountApi } from '../../store/account-api';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { profileApi } from '../../store/profile-api';

interface Props {
  coverSrc?: string;
  isEditing?: boolean;
}

const ProfileCover: React.FC<Props> = ({ coverSrc, isEditing = false }) => {
  const bgColor = useColorModeValue('gray.100', 'gray.800');

  const coverInputRef = useRef<HTMLInputElement>(null);
  const [coverFile, setCoverFile] = useState<Blob | null>();
  const dispatch = useAppDispatch();

  const myId = useAppSelector(({ auth }) => auth.userId) ?? 'unknown';

  const openCoverInput = () => coverInputRef.current?.click();

  const coverChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCoverFile =
      event.currentTarget.files && event.currentTarget.files[0];
    setCoverFile(newCoverFile);
    if (newCoverFile) {
      dispatch(accountApi.endpoints.uploadCover.initiate(newCoverFile)).then(
        () => {
          dispatch(
            accountApi.endpoints.getAccountData.initiate(undefined, {
              forceRefetch: true,
            })
          );
          dispatch(
            profileApi.endpoints.getProfile.initiate(myId, {
              forceRefetch: true,
            })
          );
        }
      );
      console.log(newCoverFile);
    }
  };

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
        {coverSrc && <Image src={coverSrc} />}
        {isEditing && (
          <LightMode>
            <IconButton
              aria-label="Edit profile picture"
              icon={<HeroIcon as={PencilIcon} />}
              colorScheme="translucent"
              variant="solid"
              size="md"
              sx={buttonStyle}
              onClick={openCoverInput}
            />
            <VisuallyHiddenInput
              type="file"
              onChange={coverChangeHandler}
              ref={coverInputRef}
            />
          </LightMode>
        )}
      </Box>
    </AspectRatio>
  );
};
export default ProfileCover;
