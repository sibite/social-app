import { Box, BoxProps } from '@chakra-ui/react';
import React from 'react';

const Overlay: React.FC<BoxProps> = ({ children, onClick, ...rest }) => {
  const style = {
    width: '100%',
    height: '100%',
    position: 'relative',
    pointerEvents: 'auto',
    flexGrow: 1,
    bgColor: 'blackAlpha.700',
  };

  const clickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    const wasClickedOnBackground = event.currentTarget === event.target;
    if (onClick && wasClickedOnBackground) onClick(event);
  };

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Box __css={style} {...rest} onClick={clickHandler}>
      {children}
    </Box>
  );
};
export default Overlay;
