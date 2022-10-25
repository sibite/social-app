import { LinkBox } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import ProfileCard from './ProfileCard';
import ProfileCardFollowButton from './ProfileCardFollowButton';
import ProfileCardSkeleton from './ProfileCardSkeleton';
import { useGetProfileQuery } from '../../store/profile-api';

interface Props {
  profileId: string;
}

const ProfileCardAPIWrapper: React.FC<Props> = ({ profileId }) => {
  const { data, isLoading } = useGetProfileQuery(profileId);
  let profile = data;

  if (isLoading) return <ProfileCardSkeleton />;

  if (!profile)
    profile = {
      avatarSrc: 'none',
      fullName: 'User',
      isFollowed: true,
    };

  const { fullName, avatarSrc, description } = profile;

  return (
    <LinkBox as={Link} to={`/profile/${profileId}`}>
      <ProfileCard
        avatarSrc={avatarSrc}
        fullName={fullName}
        description={description}
        rightButton={
          <ProfileCardFollowButton
            profileId={profileId}
            isFollowed={profile.isFollowed}
          />
        }
      />
    </LinkBox>
  );
};
export default ProfileCardAPIWrapper;
