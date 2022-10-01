import { Badge, Heading, SimpleGrid, VStack } from '@chakra-ui/react';
import ProfileCard from './ProfileCard';

interface Props {
  followed: string[];
}

const Following: React.FC<Props> = ({ followed }) => {
  const ProfilesListJSX = followed.map((id) => <ProfileCard profileId={id} />);

  return (
    <VStack spacing={8} py={12}>
      <Heading as="h2" size="lg" alignSelf="flex-start">
        Following
        <Badge ml={3} fontSize="lg">
          {followed.length}
        </Badge>
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4} width="100%">
        {ProfilesListJSX}
      </SimpleGrid>
      ;
    </VStack>
  );
};
export default Following;
