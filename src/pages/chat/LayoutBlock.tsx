import { Box, useColorModeValue } from '@chakra-ui/react';

interface PropsType {
  children?: React.ReactNode;
}

const LayoutBlock: React.FC<PropsType> = ({ children }) => {
  const style = {
    bg: useColorModeValue('white', 'black'),
    w: 'full',
    h: 'full',
  };

  return <Box sx={style}>{children}</Box>;
};

export default LayoutBlock;
