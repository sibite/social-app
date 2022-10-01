import {
  Box,
  Flex,
  IconButton,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { ChevronDoubleRightIcon } from '@heroicons/react/outline';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import formatDate from '../../shared/formatDate';
import {
  useCreateCommentMutation,
  useGetCommentsQuery,
} from '../../store/feed-api';
import { useAppSelector } from '../../store/hooks';
import HeroIcon from '../chakra-ui/HeroIcon';
import AutoResizedTextArea from '../misc/AutoResizedTextArea';
import Comment from './Comment';

interface Props {
  postId: string;
}

const CommentsSection: React.FC<Props> = ({ postId }) => {
  const { data: comments, isLoading, isError } = useGetCommentsQuery(postId);
  const [createComment] = useCreateCommentMutation();
  const myId = useAppSelector((state) => state.auth.userId);
  const [content, setContent] = useState('');
  const newCommentRef = useRef<any>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    createComment({
      postId,
      content,
    })
      .unwrap()
      .then(() => {
        setContent('');
        newCommentRef.current.clear();
      });
  };

  const newCommentChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(event.currentTarget.value);
  };

  const bg = useColorModeValue('white', 'gray.800');

  const CommentsJSX =
    comments &&
    comments.map((comment) => (
      <Comment
        postId={postId}
        commentId={comment._id}
        isDeletable={myId === comment.creatorId}
        name={comment.fullName}
        avatarSrc={comment.avatarSrc}
        dateString={formatDate(dayjs(comment.date))}
      >
        {comment.content}
      </Comment>
    ));

  return (
    <Flex maxHeight="100%" direction="column" overflow="hidden">
      <VStack
        align="flex-start"
        p={4}
        spacing={5}
        bgColor={bg}
        overflowY="auto"
      >
        {CommentsJSX}
      </VStack>
      <Flex
        as="form"
        width="100%"
        p={4}
        gap={2}
        alignItems="flex-end"
        onSubmit={submitHandler}
      >
        <AutoResizedTextArea
          autofocus
          flexGrow="1"
          placeholder="Enter new comment"
          defaultValue={content}
          onChange={newCommentChangeHandler}
          ref={newCommentRef}
        />
        <IconButton
          icon={<HeroIcon as={ChevronDoubleRightIcon} />}
          type="submit"
          colorScheme="twitter"
          aria-label="Submit comment"
          disabled={content.length === 0}
        />
      </Flex>
    </Flex>
  );
};

export default CommentsSection;
