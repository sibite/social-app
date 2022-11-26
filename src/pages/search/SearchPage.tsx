import {
  Badge,
  Box,
  Container,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import useIsMobile from '../../hooks/useIsMobile';
import useSetThemeColor from '../../hooks/useSetThemeColor';
import { useSearchProfilesQuery } from '../../store/profile-api';
import SearchResultsList from './SearchResultsList';

const SearchPage: React.FC = () => {
  const { searchQuery } = useParams();
  const { data } = useSearchProfilesQuery(searchQuery ?? '');
  const resultsCount = data?.length ?? 0;

  const bg = useColorModeValue('gray.100', 'black');

  useSetThemeColor(bg, useIsMobile());

  return (
    <Box width="100%" minHeight="100%" bg={bg} py={8}>
      <Container maxWidth="xl">
        <Heading as="h1" size="md">
          Search results
          <Badge
            colorScheme={resultsCount ? 'green' : 'red'}
            fontSize="lg"
            ml={2}
          >
            {resultsCount}
          </Badge>
        </Heading>
        <Heading as="h2" size="lg" my={4}>
          &quot;{searchQuery}&quot;
        </Heading>
        <SearchResultsList />
      </Container>
    </Box>
  );
};
export default SearchPage;
