import { Box, BoxProps } from '@chakra-ui/react';

const Overlay: React.FC<BoxProps> = ({ children, onClick, ...rest }) => {
  const style = {
    width: '100%',
    height: '100%',
    position: 'relative',
    pointerEvents: 'auto',
    flexGrow: 1,
    bgColor: 'blackAlpha.700',
  };

  const backgroundStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
  };

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Box __css={style} {...rest}>
      <Box sx={backgroundStyle} onClick={onClick} />
      {children}
    </Box>
  );
};
export default Overlay;
