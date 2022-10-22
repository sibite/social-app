import { Flex, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

const ProfileCardSkeleton: React.FC = () => (
  <Flex alignItems="center" gap={2} width="100%">
    <SkeletonCircle mr={4} />
    <SkeletonText noOfLines={2} spacing={1} flex="1 1 auto" />
  </Flex>
);
export default ProfileCardSkeleton;
