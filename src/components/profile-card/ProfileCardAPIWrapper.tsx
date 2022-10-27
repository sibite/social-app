import { LinkBox } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import ProfileCard from './ProfileCard';
import ProfileCardFollowButton from './ProfileCardFollowButton';
import ProfileCardSkeleton from './ProfileCardSkeleton';
import { useGetProfileQuery } from '../../store/profile-api';
import { useGetAccountDataQuery } from '../../store/account-api';

interface Props {
  profileId: string;
}

const ProfileCardAPIWrapper: React.FC<Props> = ({ profileId }) => {
  const { data, isLoading } = useGetProfileQuery(profileId);
  const { data: following } = useGetAccountDataQuery(undefined, {
    selectFromResult: (result) => ({ data: result.data?.following ?? [] }),
  });

  let profile = data;
  const isFollowed = following.indexOf(profileId) !== -1;

  if (isLoading) return <ProfileCardSkeleton />;

  if (!profile)
    profile = {
      avatarSrc: 'none',
      fullName: 'User',
      isFollowed,
    };

  const { fullName, avatarSrc, description } = profile;

  return (
    <LinkBox as={Link} to={`/profile/${profileId}`}>
      <ProfileCard
        avatarSrc={avatarSrc}
        fullName={fullName}
        description={description}
        rightButton={
          data || profile.isFollowed ? (
            <ProfileCardFollowButton
              profileId={profileId}
              isFollowed={profile.isFollowed}
            />
          ) : null
        }
      />
    </LinkBox>
  );
};
export default ProfileCardAPIWrapper;
