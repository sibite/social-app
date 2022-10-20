import { Flex, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

const SearchItemSkeleton: React.FC = () => (
  <Flex alignItems="center" gap={2}>
    <SkeletonCircle mr={4} />
    <SkeletonText noOfLines={2} spacing={1} flex="1 1 auto" />
  </Flex>
);
export default SearchItemSkeleton;
