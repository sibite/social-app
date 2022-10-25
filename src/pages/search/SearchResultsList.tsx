import { Flex, LinkBox, VStack } from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import { useSearchProfilesQuery } from '../../store/profile-api';
import ProfileCard from '../../components/profile-card/ProfileCard';
import ProfileCardSkeleton from '../../components/profile-card/ProfileCardSkeleton';
import ProfileCardFollowButton from '../../components/profile-card/ProfileCardFollowButton';

const SearchResultsList: React.FC = () => {
  const { searchQuery } = useParams();

  const { currentData, isFetching } = useSearchProfilesQuery(
    searchQuery ?? '',
    { refetchOnMountOrArgChange: true }
  );

  if (isFetching)
    return (
      <VStack alignItems="stretch" py={4} spacing={8}>
        <ProfileCardSkeleton />
        <ProfileCardSkeleton />
        <ProfileCardSkeleton />
      </VStack>
    );

  return (
    <Flex direction="column" gap={4} py={4}>
      {currentData &&
        currentData.map(
          ({ _id, fullName, avatarSrc, description, isFollowed }) => (
            <LinkBox key={_id} as={Link} to={`/profile/${_id}`}>
              <ProfileCard
                fullName={fullName}
                avatarSrc={avatarSrc}
                description={description}
                rightButton={
                  <ProfileCardFollowButton
                    profileId={_id!}
                    isFollowed={isFollowed}
                  />
                }
              />
            </LinkBox>
          )
        )}
    </Flex>
  );
};
export default SearchResultsList;
