import {
  Alert,
  AlertIcon,
  AlertTitle,
  Flex,
  Heading,
  IconButton,
  useBoolean,
  VStack,
} from '@chakra-ui/react';
import { XIcon } from '@heroicons/react/outline';
import { useRef, useState } from 'react';
import useUploadManager from '../../hooks/useUploadManager';
import { useCreatePostMutation } from '../../store/feed-api';
import Card from '../chakra-ui/Card';
import HeroIcon from '../chakra-ui/HeroIcon';
import AutoResizedTextArea from '../misc/AutoResizedTextArea';
import Thumbnails from '../post/Thumbnails';
import NewPostButtons from './NewPostButtons';
import OpenNewPostButton from './OpenNewPostButton';

const NewPost: React.FC = () => {
  const [isExpanded, setIsExpanded] = useBoolean(false);
  const [description, setDescription] = useState('');
  const textAreaRef = useRef<any>();

  const [createPost, { isLoading, isError }] = useCreatePostMutation();

  const {
    files,
    isLoading: isLoadingFiles,
    changeHandler: filesChangeHandler,
    addFiles,
    removeFile,
    clearAll,
  } = useUploadManager();

  const descriptionChangeHandler: React.ChangeEventHandler<
    HTMLTextAreaElement
  > = (event) => {
    setDescription(event.currentTarget.value);
  };

  const pasteHandler = (event: React.ClipboardEvent) => {
    addFiles(event.clipboardData.files);
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    await createPost({
      content: description.trim(),
      media: files.map((wrapper) => wrapper.file),
    }).unwrap();

    setDescription('');
    clearAll();
    setIsExpanded.off();
  };

  if (!isExpanded) {
    return <OpenNewPostButton onClick={setIsExpanded.on} />;
  }

  return (
    <Card as="form" width="100%" p={4} onSubmit={submitHandler}>
      <VStack spacing={4} alignItems="flex-start">
        <Flex justify="space-between" alignItems="center" width="100%">
          <Heading as="h2" size="md">
            New post
          </Heading>
          <IconButton
            variant="ghost"
            aria-label="Close"
            icon={<HeroIcon as={XIcon} />}
            onClick={setIsExpanded.off}
          />
        </Flex>
        {isError && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>An error occured</AlertTitle>
          </Alert>
        )}
        <AutoResizedTextArea
          ref={textAreaRef}
          width="100%"
          minHeight="7em"
          autoFocus
          disabled={isLoading}
          onChange={descriptionChangeHandler}
          onPaste={pasteHandler}
          defaultValue={description}
        />
        <NewPostButtons
          isSending={isLoading}
          isImportingFiles={isLoadingFiles}
          isPostEmpty={description.length + files.length === 0}
          filesChangeHandler={filesChangeHandler}
        />
        {files.length && <Thumbnails files={files} onRemove={removeFile} />}
      </VStack>
    </Card>
  );
};
export default NewPost;
