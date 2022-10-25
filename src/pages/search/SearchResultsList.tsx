import { Flex, LinkBox, VStack } from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import { useSearchProfilesQuery } from '../../store/profile-api';
import ProfileCard from '../../components/profile-card/ProfileCard';
import ProfileCardSkeleton from '../../components/profile-card/ProfileCardSkeleton';
import ProfileCardFollowButton from '../../components/profile-card/ProfileCardFollowButton';
import ProfileCardAPIWrapper from '../../components/profile-card/ProfileCardAPIWrapper';

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
        currentData.map((id) => (
          <ProfileCardAPIWrapper key={id} profileId={id} />
        ))}
    </Flex>
  );
};
export default SearchResultsList;
