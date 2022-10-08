import { Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useSearchProfilesQuery } from '../../store/profile-api';
import SearchItem from './SearchItem';
import SearchItemSkeleton from './SearchItemSkeleton';

const SearchResultsList: React.FC = () => {
  const { searchQuery } = useParams();

  const { currentData, isFetching } = useSearchProfilesQuery(
    searchQuery ?? '',
    { refetchOnMountOrArgChange: true }
  );

  if (isFetching)
    return (
      <>
        <SearchItemSkeleton />
        <SearchItemSkeleton />
        <SearchItemSkeleton />
      </>
    );

  return (
    <Flex direction="column" gap={4} py={4}>
      {currentData &&
        currentData.map(({ _id, fullName, avatarSrc, description }) => (
          <SearchItem
            _id={_id}
            fullName={fullName}
            avatarSrc={avatarSrc}
            description={description}
          />
        ))}
    </Flex>
  );
};
export default SearchResultsList;
