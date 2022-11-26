import { Flex, useColorModeValue, VStack } from '@chakra-ui/react';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import { NAVBAR_TOTAL_HEIGHT } from '../../../shared/navBarHeight';
import { useGetCommentsQuery } from '../../../store/feed-api';
import CommentInput from './CommentInput';
import CommentsList from './CommentsList';

interface Props {
  postId: string;
  limitHeight?: boolean;
}

const CommentsSection: React.FC<Props> = ({ postId, limitHeight }) => {
  const { data: comments, isLoading } = useGetCommentsQuery(postId);
  const { windowHeight } = useWindowDimensions();

  const wrapperStyle = {
    flexDirection: 'column',
    maxHeight: limitHeight
      ? `${windowHeight - NAVBAR_TOTAL_HEIGHT - 100}px`
      : undefined,
    overflowY: limitHeight ? 'auto' : undefined,
  };

  const stackStyle = {
    alignItems: 'flex-start',
    px: 4,
    py: 4,
    width: '100%',
  };

  return (
    <Flex sx={wrapperStyle}>
      <VStack sx={stackStyle} spacing={5}>
        <CommentInput postId={postId} />
        <CommentsList comments={comments} isLoading={isLoading} />
      </VStack>
    </Flex>
  );
};

export default CommentsSection;
