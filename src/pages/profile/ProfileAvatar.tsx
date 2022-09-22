import {
  Center,
  Avatar,
  IconButton,
  useColorModeValue,
  FormLabel,
  Input,
  VisuallyHiddenInput,
} from '@chakra-ui/react';
import { PencilIcon } from '@heroicons/react/outline';
import { useEffect, useRef, useState } from 'react';
import HeroIcon from '../../components/chakra-ui/HeroIcon';
import { accountApi } from '../../store/account-api';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { profileApi } from '../../store/profile-api';

interface Props {
  name?: string;
  avatarSrc?: string;
  isEditing?: boolean;
}

const ProfileAvatar: React.FC<Props> = ({ name, avatarSrc, isEditing }) => {
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [avatarFile, setAvatarFile] = useState<Blob | null>();
  const dispatch = useAppDispatch();

  const myId = useAppSelector(({ auth }) => auth.userId) ?? 'unknown';

  const borderColor = useColorModeValue('gray.50', 'gray.700');

  const openAvatarInput = () => avatarInputRef.current?.click();

  const avatarChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAvatarFile =
      event.currentTarget.files && event.currentTarget.files[0];
    setAvatarFile(newAvatarFile);
    if (newAvatarFile) {
      console.log(
        dispatch(
          accountApi.endpoints.uploadAvatar.initiate(newAvatarFile)
        ).then(() => {
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
        })
      );
    }
  };

  // let isSuccess: boolean = false;

  // if (avatarFile) {
  //   isSuccess =
  //     accountApi.endpoints.uploadAvatar.useQueryState(avatarFile).isSuccess;
  // }

  // useEffect(() => {
  //   if (isSuccess) {
  //     accountApi.util.updateQueryData('getAccountData', undefined, () => {
  //       const a = 2;
  //     });
  //   }
  // }, [isSuccess]);

  // if (isSuccess) console.log('avatar uploaded');

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
        name={name}
        sx={avatarStyle}
      >
        {isEditing && [
          <IconButton
            aria-label="Edit profile picture"
            icon={<HeroIcon as={PencilIcon} />}
            colorScheme="plainGray"
            variant="solid"
            size="md"
            sx={buttonStyle}
            onClick={openAvatarInput}
          />,
          <VisuallyHiddenInput
            type="file"
            onChange={avatarChangeHandler}
            ref={avatarInputRef}
          />,
        ]}
      </Avatar>
    </Center>
  );
};
export default ProfileAvatar;
