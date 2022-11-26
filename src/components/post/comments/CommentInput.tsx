import { Avatar, Flex, IconButton, useColorModeValue } from '@chakra-ui/react';
import { ChevronDoubleRightIcon } from '@heroicons/react/outline';
import { useCallback, useEffect, useRef, useState } from 'react';
import useIsAuthenticated from '../../../hooks/useIsAuthenticated';
import { useGetAccountDataQuery } from '../../../store/account-api';
import { useCreateCommentMutation } from '../../../store/feed-api';
import { useAppSelector } from '../../../store/hooks';
import HeroIcon from '../../chakra-ui/HeroIcon';
import AutoResizedTextArea from '../../misc/AutoResizedTextArea';

interface Props {
  postId: string;
}

const savedInputs: { [key: string]: string } = { ZbXDgbimWjOZOJZv: 'TEST' };

const CommentInput: React.FC<Props> = ({ postId }) => {
  const { data: account } = useGetAccountDataQuery();
  const [createComment, { isLoading: isSending }] = useCreateCommentMutation();

  const isAuthenticated = useIsAuthenticated();
  const myToken = useAppSelector((state) => state.auth.token);

  const [content, setContent] = useState('');
  const newCommentRef = useRef<any>(null);

  const fullName = account?.fullName;
  const avatarSrc = account?.avatarSrc;

  useEffect(() => {
    setContent(savedInputs[myToken + postId] ?? '');
  }, [myToken, postId]);

  const sendComment = useCallback(() => {
    createComment({
      postId,
      content,
    })
      .unwrap()
      .then(() => {
        setContent('');
        delete savedInputs[myToken + postId];
        newCommentRef.current.clear();
      });
  }, [postId, myToken, content, createComment]);

  if (!isAuthenticated) return null;

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    sendComment();
  };

  const newCommentChangeHandler: React.ChangeEventHandler<
    HTMLTextAreaElement
  > = (event) => {
    setContent(event.currentTarget.value);
    savedInputs[myToken + postId] = event.currentTarget.value;
  };

  const textAreaKeyPressHandler: React.KeyboardEventHandler = (event) => {
    if (event.code !== 'Enter' || event.shiftKey) return;

    event.preventDefault();
    sendComment();
  };

  return (
    <Flex
      as="form"
      width="100%"
      gap={2}
      alignItems="center"
      onSubmit={submitHandler}
    >
      <Avatar src={avatarSrc} name={fullName} size="sm" />
      <AutoResizedTextArea
        required
        flexGrow="1"
        placeholder="Enter new comment"
        value={content}
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
  );
};
export default CommentInput;
