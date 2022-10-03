import {
  Avatar,
  Center,
  Flex,
  IconButton,
  Spinner,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { ChevronDoubleRightIcon } from '@heroicons/react/outline';
import dayjs from 'dayjs';
import { useMemo, useRef, useState } from 'react';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import formatDate from '../../shared/formatDate';
import { useGetAccountDataQuery } from '../../store/account-api';
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
  limitHeight?: boolean;
}

const CommentsSection: React.FC<Props> = ({ postId, limitHeight }) => {
  const { data: comments, isLoading } = useGetCommentsQuery(postId);
  const { data: account } = useGetAccountDataQuery();
  const [createComment, { isLoading: isSending }] = useCreateCommentMutation();

  const myId = useAppSelector((state) => state.auth.userId);

  const { windowHeight } = useWindowDimensions();

  const [content, setContent] = useState('');
  const newCommentRef = useRef<any>(null);

  const fullName = account?.fullName;
  const avatarSrc = account?.avatarSrc;

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

  const CommentsJSX = useMemo(
    () =>
      comments &&
      comments.map((comment) => (
        <Comment
          key={comment._id}
          postId={postId}
          commentId={comment._id}
          isDeletable={myId === comment.creatorId}
          name={comment.fullName}
          avatarSrc={comment.avatarSrc}
          dateString={formatDate(dayjs(comment.date))}
        >
          {comment.content}
        </Comment>
      )),
    [comments, postId, myId]
  );

  return (
    <Flex
      direction="column"
      maxHeight={limitHeight ? `${windowHeight - 61 - 150}px` : undefined}
      overflowY={limitHeight ? 'auto' : undefined}
    >
      <VStack
        align="flex-start"
        px={4}
        py={4}
        spacing={5}
        bgColor={bg}
        width="100%"
      >
        <Flex
          as="form"
          width="100%"
          bg={bg}
          gap={2}
          alignItems="center"
          onSubmit={submitHandler}
        >
          <Avatar src={avatarSrc} name={fullName} size="sm" />
          <AutoResizedTextArea
            autoFocus
            required
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
            alignSelf="flex-end"
            isLoading={isSending}
            disabled={content.length === 0 || isSending}
          />
        </Flex>
        {CommentsJSX ||
          (isLoading && (
            <Center alignSelf="center">
              <Spinner />
            </Center>
          ))}
      </VStack>
    </Flex>
  );
};

export default CommentsSection;
