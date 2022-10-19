import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  IconButton,
  Text,
  useBoolean,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import {
  ArrowRightIcon,
  PhotographIcon,
  XIcon,
} from '@heroicons/react/outline';
import { useRef, useState } from 'react';
import { CreatePostType } from '../../../server/api-types/feed';
import useUploadManager from '../../hooks/useUploadManager';
import { useCreatePostMutation } from '../../store/feed-api';
import Card from '../chakra-ui/Card';
import HeroIcon from '../chakra-ui/HeroIcon';
import AutoResizedTextArea from '../misc/AutoResizedTextArea';
import CustomFilePicker from '../misc/CustomFilePicker';
import Thumbnails from '../post/Thumbnails';

const NewPost: React.FC = () => {
  const [isExpanded, setIsExpanded] = useBoolean(false);
  const [description, setDescription] = useState('');

  const [createPost, { isLoading, isError }] = useCreatePostMutation();

  const textAreaRef = useRef<any>();

  const {
    files,
    isLoading: isLoadingFiles,
    changeHandler,
    addFiles,
    removeFile,
    clearAll,
  } = useUploadManager();

  const descriptionChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.currentTarget.value);
  };

  const pasteHandler = (event: React.ClipboardEvent) => {
    addFiles(event.clipboardData.files);
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    const queryArg: CreatePostType = {
      content: description.trim(),
      media: files.map((wrapper) => wrapper.file),
    };

    await createPost(queryArg).unwrap();

    setDescription('');
    clearAll();
    setIsExpanded.off();
  };

  const expandButtonStyle = {
    width: '100%',
    fontWeight: 'normal',
    textAlign: 'left',
    cursor: 'text',
    borderRadius: 'lg',
    padding: 4,
    bgColor: useColorModeValue('white', 'gray.900'),
    '&:hover': {
      boxShadow: useColorModeValue('0px 5px 10px rgba(0,0,0,0.08)', 'none'),
    },
    transition: 'bos-shadow 300ms',
  };

  if (!isExpanded) {
    return (
      <Box as="button" sx={expandButtonStyle} onClick={setIsExpanded.on}>
        <Text opacity={0.7}>Type what is on your mind...</Text>
      </Box>
    );
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
        <ButtonGroup alignSelf="flex-end">
          <CustomFilePicker
            onChange={changeHandler}
            multiple
            accept="image/png, image/jpeg, image/webp, image/gif"
          >
            <Button
              leftIcon={<HeroIcon as={PhotographIcon} inButton />}
              isLoading={isLoadingFiles}
              disabled={isLoading || isLoadingFiles}
              loadingText="Importing photos"
            >
              Import photos
            </Button>
          </CustomFilePicker>
          <Button
            leftIcon={<HeroIcon as={ArrowRightIcon} inButton />}
            type="submit"
            colorScheme="twitter"
            disabled={
              isLoading ||
              isLoadingFiles ||
              description.length + files.length === 0
            }
            isLoading={isLoading}
            loadingText="Posting"
          >
            Post
          </Button>
        </ButtonGroup>
        {files.length && <Thumbnails files={files} onRemove={removeFile} />}
      </VStack>
    </Card>
  );
};
export default NewPost;
