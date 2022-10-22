import { LinkBox } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import ProfileCard from '../../../components/profile-card/ProfileCard';
import ProfileCardSkeleton from '../../../components/profile-card/ProfileCardSkeleton';
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
      avatarSrc: '',
      description: 'Account not found',
      isFollowed: true,
    };

  const { fullName, avatarSrc, description } = profile;

  return (
    <LinkBox as={Link} to={`/profile/${profileId}`}>
      <ProfileCard
        avatarSrc={avatarSrc}
        fullName={fullName}
        description={description}
      />
    </LinkBox>
  );
};
export default FollowingItem;
