import {
  Stack,
  HStack,
  SkeletonCircle,
  Skeleton,
  SkeletonText,
} from '@chakra-ui/react';

const PostSkeleton: React.FC = () => (
  <Stack w="100%" spacing={6} py={5}>
    <HStack>
      <SkeletonCircle />
      <Skeleton h={4} w={20} />
    </HStack>
    <SkeletonText noOfLines={4} spacing={3} />
    {Math.random() < 0.4 && <Skeleton h={40} />}
  </Stack>
);
export default PostSkeleton;
