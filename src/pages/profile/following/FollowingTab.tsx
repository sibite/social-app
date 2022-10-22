import { Badge, Heading, SimpleGrid, VStack } from '@chakra-ui/react';
import FollowingItem from './FollowingItem';

interface Props {
  followed: string[];
}

const FollowingTab: React.FC<Props> = ({ followed }) => {
  const ProfilesListJSX = followed.map((id) => (
    <FollowingItem profileId={id} key={id} />
  ));

  return (
    <VStack spacing={8} py={12} px={4}>
      <Heading as="h2" size="lg" alignSelf="flex-start">
        Following
        <Badge ml={3} fontSize="lg" colorScheme="blue">
          {followed.length}
        </Badge>
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4} width="100%">
        {ProfilesListJSX}
      </SimpleGrid>
    </VStack>
  );
};
export default FollowingTab;
