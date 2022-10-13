import { Box, useColorModeValue } from '@chakra-ui/react';

interface Props {
  children?: React.ReactNode;
}

const LayoutBlock: React.FC<Props> = ({ children }) => {
  const style = {
    bg: useColorModeValue('white', 'black'),
    w: '100%',
    h: '100%',
    overflow: 'hidden',
  };

  return <Box sx={style}>{children}</Box>;
};

export default LayoutBlock;
