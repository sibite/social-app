import { IconButton, Tooltip } from '@chakra-ui/react';
import { UserAddIcon, UserRemoveIcon } from '@heroicons/react/outline';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';
import { useAppSelector } from '../../store/hooks';
import {
  useGetProfileQuery,
  useToggleFollowMutation,
} from '../../store/profile-api';
import HeroIcon from '../chakra-ui/HeroIcon';

interface Props {
  profileId: string;
  isFollowed: boolean;
}

const ProfileCardFollowButton: React.FC<Props> = ({
  profileId,
  isFollowed,
}) => {
  const isAuthenticated = useIsAuthenticated();
  const myId = useAppSelector((state) => state.auth.userId);
  const toggleFollow = useToggleFollowMutation()[0];

  if (!isAuthenticated || myId === profileId) return null;

  const followHandler: React.MouseEventHandler = (e) => {
    e.preventDefault();
    toggleFollow(profileId);
  };

  const FollowButtonJSX = (
    <Tooltip label="Follow" aria-label="A tooltip">
      <IconButton
        variant="ghost"
        icon={<HeroIcon as={UserAddIcon} />}
        aria-label="Follow"
        colorScheme="twitter"
        onClick={followHandler}
      />
    </Tooltip>
  );

  const UnfollowButtonJSX = (
    <Tooltip label="Unfollow" aria-label="A tooltip">
      <IconButton
        variant="ghost"
        icon={<HeroIcon as={UserRemoveIcon} />}
        aria-label="Unfollow"
        onClick={followHandler}
      />
    </Tooltip>
  );

  return isFollowed ? UnfollowButtonJSX : FollowButtonJSX;
};
export default ProfileCardFollowButton;
