import { Center, Spinner } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { CommentIncomingType } from '../../../../server/api-types/feed';
import formatDateRelative from '../../../shared/formatDateRelative';
import { useAppSelector } from '../../../store/hooks';
import InteractiveContent from '../../misc/InteractiveContent';
import Comment from './Comment';
import CommentMenu from './CommentMenu';

interface Props {
  comments?: CommentIncomingType[];
  isLoading?: boolean;
}

const CommentsList: React.FC<Props> = ({ comments, isLoading }) => {
  const myId = useAppSelector((state) => state.auth.userId);

  if (!comments && isLoading)
    return (
      <Center alignSelf="center">
        <Spinner />
      </Center>
    );

  if (!comments) return null;

  return (
    <>
      {comments.map((comment) => (
        <Comment
          key={comment._id}
          profileId={comment.creatorId}
          fullName={comment.fullName}
          avatarSrc={comment.avatarSrc}
          dateString={formatDateRelative(dayjs(comment.date))}
          commentMenu={
            <CommentMenu
              commentId={comment._id}
              postId={comment.postId}
              isDeletable={myId === comment.creatorId}
            />
          }
        >
          <InteractiveContent textContent={comment.content} />
        </Comment>
      ))}
    </>
  );
};
export default CommentsList;
