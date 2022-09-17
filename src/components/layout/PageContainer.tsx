import { Box, BoxProps, Grid } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import PortalRefContext from '../../store/ref-context';
import FixedContainer from '../misc/FixedContainer';
import NavBar from '../nav-bar/NavBar';

const PageContainer: React.FC<BoxProps> = ({ children, ...rest }) => {
  const [navBarHeight, setNavBarHeight] = useState(0);

  const ref = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setNavBarHeight(ref.current!.offsetHeight);
  }, [ref]);

  const portalBoxStyle = {
    pointerEvents: 'none',
    flexGrow: '1',
    gridTemplate: '100% / 100%',
  };

  return (
    <>
      <FixedContainer>
        <NavBar ref={ref} />
        <Grid sx={portalBoxStyle} ref={portalRef} />
      </FixedContainer>
      <Box
        width="100%"
        minHeight={`calc(100vh - ${navBarHeight}px)`}
        marginTop={`${navBarHeight}px`}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      >
        <PortalRefContext.Provider value={portalRef}>
          {children}
        </PortalRefContext.Provider>
      </Box>
    </>
  );
};
export default PageContainer;
