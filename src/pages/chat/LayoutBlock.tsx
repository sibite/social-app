import { Box, GridItem, useColorModeValue } from '@chakra-ui/react';

interface Props {
  gridArea?: string;
  children?: React.ReactNode;
}

const LayoutBlock: React.FC<Props> = ({ children, gridArea }) => {
  const style = {
    bg: useColorModeValue('white', 'black'),
    w: '100%',
    h: '100%',
    overflow: 'hidden',
  };

  return (
    <GridItem area={gridArea}>
      <Box sx={style}>{children}</Box>;
    </GridItem>
  );
};

export default LayoutBlock;
