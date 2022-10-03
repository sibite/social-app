import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  VStack,
} from '@chakra-ui/react';

const ProfilePageSkeleton: React.FC = () => (
  <VStack spacing={5}>
    <Skeleton w="1000px" h="300px" maxW="100%" />
    <SkeletonCircle mt={10} boxSize="150px" />
    <Skeleton w="120px" h={6} maxW="100%" />
    <SkeletonText noOfLines={3} w="300px" maxW="100%" />
  </VStack>
);
export default ProfilePageSkeleton;
