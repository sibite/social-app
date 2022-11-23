import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
} from '@chakra-ui/react';
import { RefreshIcon } from '@heroicons/react/outline';
import { feedApi } from '../../store/feed-api';
import { useAppDispatch } from '../../store/hooks';
import HeroIcon from '../chakra-ui/HeroIcon';

interface Props {
  postId: string;
}

const PostError: React.FC<Props> = ({ postId }) => {
  const dispatch = useAppDispatch();

  const refetch = () => {
    dispatch(feedApi.endpoints.getPost.initiate(postId));
  };

  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription flexGrow={1}>Post unavailable</AlertDescription>
      <Button
        rightIcon={<HeroIcon as={RefreshIcon} />}
        variant="ghost"
        colorScheme="gray"
        onClick={refetch}
      >
        Reload
      </Button>
    </Alert>
  );
};
export default PostError;
