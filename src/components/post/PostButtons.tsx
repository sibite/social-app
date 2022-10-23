import {
  Badge,
  Button,
  Flex,
  useBreakpointValue,
  useToast,
} from '@chakra-ui/react';
import { AnnotationIcon, HeartIcon, ShareIcon } from '@heroicons/react/outline';
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid';
import { useCallback } from 'react';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';
import useMobileModeValue from '../../hooks/useIsMobile';
import { useToggleLikeMutation } from '../../store/feed-api';
import HeroIcon from '../chakra-ui/HeroIcon';
import share from './share';
import SharePopover from './SharePopover';

interface Props {
  postId: string;
  isLiked: boolean;
  numOfLikes: number;
  commentsCount: number;
  alwaysShowComments?: boolean;
  onCommentsToggle: Function;
}

const PostButtons: React.FC<Props> = ({
  postId,
  isLiked,
  numOfLikes,
  commentsCount,
  alwaysShowComments = false,
  onCommentsToggle,
}) => {
  const [toggleLike] = useToggleLikeMutation();

  const toast = useToast();
  const toastPosition = useMobileModeValue('top', 'bottom');

  const isAuthenticated = useIsAuthenticated();
  const url = `${window.location.origin}/post/${postId}`;

  const likeHandler = () => toggleLike(postId);

  const shareHandler = useCallback(() => {
    share(toast, toastPosition, url);
  }, [toast, toastPosition, url]);

  const isButtonTextShown =
    useBreakpointValue({ base: false, xs: true }) || alwaysShowComments;

  return (
    <Flex justifyContent="space-evenly">
      <Button
        variant="ghost"
        flexGrow={1}
        colorScheme={isLiked ? 'red' : 'gray'}
        onClick={likeHandler}
        disabled={!isAuthenticated}
        leftIcon={<HeroIcon as={isLiked ? HeartIconFilled : HeartIcon} />}
        rightIcon={
          numOfLikes ? (
            <Badge variant="subtle" colorScheme="blue">
              {numOfLikes}
            </Badge>
          ) : undefined
        }
      >
        {isButtonTextShown && 'Like'}
      </Button>

      {!alwaysShowComments && (
        <Button
          variant="ghost"
          flexGrow={1}
          leftIcon={<HeroIcon as={AnnotationIcon} />}
          rightIcon={
            commentsCount ? (
              <Badge variant="subtle" colorScheme="blue">
                {commentsCount}
              </Badge>
            ) : undefined
          }
          onClick={() => onCommentsToggle()}
        >
          {isButtonTextShown && 'Comments'}
        </Button>
      )}
      <SharePopover url={url}>
        <Button
          variant="ghost"
          flexGrow={1}
          leftIcon={<HeroIcon as={ShareIcon} />}
          onClick={shareHandler}
        >
          {isButtonTextShown && 'Share'}
        </Button>
      </SharePopover>
    </Flex>
  );
};

export default PostButtons;
