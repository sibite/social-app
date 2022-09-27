import { Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useSearchProfilesQuery } from '../../store/profile-api';
import SearchItem from './SearchItem';

const SearchResultsList: React.FC = () => {
  const { searchQuery } = useParams();

  const { data, isLoading, isError } = useSearchProfilesQuery(
    searchQuery ?? '',
    { refetchOnMountOrArgChange: true }
  );

  return (
    <Flex direction="column" gap={4} py={4}>
      {data &&
        data.map(({ _id, fullName, avatarSrc, description }) => (
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
