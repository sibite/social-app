import { LinkBox } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import ProfileCard from '../../../components/profile-card/ProfileCard';
import ProfileCardFollowButton from '../../../components/profile-card/ProfileCardFollowButton';
import ProfileCardSkeleton from '../../../components/profile-card/ProfileCardSkeleton';
import useIsAuthenticated from '../../../hooks/useIsAuthenticated';
import { useGetProfileQuery } from '../../../store/profile-api';

interface Props {
  profileId: string;
}

const FollowingItem: React.FC<Props> = ({ profileId }) => {
  const profileQuery = useGetProfileQuery(profileId);
  const { isLoading } = profileQuery;
  let profile = profileQuery.data;

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
        rightButton={<ProfileCardFollowButton profileId={profileId} />}
      />
    </LinkBox>
  );
};
export default FollowingItem;
