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
import { useCallback, useMemo, useRef, useState } from 'react';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import formatDateRelative from '../../shared/formatDateRelative';
import { useGetAccountDataQuery } from '../../store/account-api';
import {
  useCreateCommentMutation,
  useGetCommentsQuery,
} from '../../store/feed-api';
import { useAppSelector } from '../../store/hooks';
import HeroIcon from '../chakra-ui/HeroIcon';
import AutoResizedTextArea from '../misc/AutoResizedTextArea';
import InteractiveContent from '../misc/InteractiveContent';
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

  const sendComment = useCallback(() => {
    createComment({
      postId,
      content,
    })
      .unwrap()
      .then(() => {
        setContent('');
        newCommentRef.current.clear();
      });
  }, [postId, content, createComment]);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    sendComment();
  };

  const newCommentChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(event.currentTarget.value);
  };

  const textAreaKeyPressHandler = (event: React.KeyboardEvent) => {
    if (event.code !== 'Enter' || event.shiftKey) return;

    event.preventDefault();
    sendComment();
  };

  const bg = useColorModeValue('white', 'gray.800');

  const CommentsJSX = useMemo(
    () =>
      comments &&
      comments.map((comment) => (
        <Comment
          key={comment._id}
          postId={postId}
          profileId={comment.creatorId}
          commentId={comment._id}
          isDeletable={myId === comment.creatorId}
          fullName={comment.fullName}
          avatarSrc={comment.avatarSrc}
          dateString={formatDateRelative(dayjs(comment.date))}
        >
          <InteractiveContent textContent={comment.content} />
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
            required
            flexGrow="1"
            placeholder="Enter new comment"
            defaultValue={content}
            onChange={newCommentChangeHandler}
            onKeyPress={textAreaKeyPressHandler}
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
