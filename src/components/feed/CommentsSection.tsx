import { VStack } from '@chakra-ui/react';
import useBackgroundColor from '../../hooks/useBackgroundColor';
import formatDate from '../../shared/formatDate';
import { Comment as CommentType } from '../../store/profile';
import Comment from './Comment';

interface Props {
  comments: CommentType[];
}

const CommentsSection: React.FC<Props> = ({ comments }) => {
  const bg = useBackgroundColor();

  const CommentsJSX = comments.map((comment) => (
    <Comment
      name={comment.name}
      avatarSrc={comment.avatarSrc}
      dateString={formatDate(comment.date)}
    >
      {comment.content}
    </Comment>
  ));

  return (
    <VStack
      align="flex-start"
      p={4}
      spacing={5}
      bgColor={bg.color100}
      maxHeight="60vh"
      overflowY="auto"
    >
      {CommentsJSX}
    </VStack>
  );
};

export default CommentsSection;
