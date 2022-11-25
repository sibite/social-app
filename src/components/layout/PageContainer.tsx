import { Box, BoxProps } from '@chakra-ui/react';

const PageContainer: React.FC<BoxProps> = ({ children, ...rest }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Box width="100%" minHeight="100%" {...rest}>
    {children}
  </Box>
);

export default PageContainer;
