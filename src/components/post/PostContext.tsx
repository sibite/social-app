import { BoxProps } from '@chakra-ui/react';
import { createContext } from 'react';

const PostContext = createContext<{
  commentColor: BoxProps['bgColor'];
}>({ commentColor: ['gray.100'] });

export default PostContext;
