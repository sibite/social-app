import { Box, BoxProps, Grid, useBreakpointValue } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import PortalRefContext from '../../store/ref-context';
import FixedContainer from '../misc/FixedContainer';
import NavBar from '../nav-bar/NavBar';

const PageContainer: React.FC<BoxProps> = ({ children, ...rest }) => {
  const [navBarHeight, setNavBarHeight] = useState(0);
  const { windowHeight } = useWindowDimensions();

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

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <>
      <FixedContainer flexDirection={isMobile ? 'column-reverse' : 'column'}>
        <NavBar ref={ref} />
        <Grid sx={portalBoxStyle} ref={portalRef} />
      </FixedContainer>
      <Box
        width="100%"
        minHeight={`${windowHeight - navBarHeight}px`}
        marginTop={!isMobile ? `${navBarHeight}px` : ''}
        marginBottom={isMobile ? `${navBarHeight}px` : ''}
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
