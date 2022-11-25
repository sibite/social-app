import {
  Box,
  Grid,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import PortalRefContext from '../../store/ref-context';
import NavBar from '../nav-bar/NavBar';
import OfflineAlert from './OfflineAlert';

const AppShell: React.FC = () => {
  const { windowHeight } = useWindowDimensions();

  const ref = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);

  const bg = useColorModeValue('white', 'black');
  const isMobile = useBreakpointValue({ base: true, md: false });

  const portalBoxStyle = {
    pointerEvents: 'none',
    gridArea: 'content',
    gridTemplate: '100% / 100%',
    position: 'relative',
    '& > *': {
      gridArea: '1 / 1',
    },
  };

  const shellStyle = {
    width: '100%',
    height: `${windowHeight}px`,
    overflow: 'hidden',
    gridTemplateAreas: isMobile ? `"content" "navbar"` : `"navbar" "content"`,
    gridTemplateRows: isMobile ? '1fr auto' : 'auto 1fr',
    gridTemplateColumns: '100%',
  };

  return (
    <Grid sx={shellStyle}>
      <NavBar ref={ref} />
      <Box bgColor={bg} overflow="auto" gridArea="content">
        <PortalRefContext.Provider value={portalRef}>
          <OfflineAlert />
          <Outlet />
        </PortalRefContext.Provider>
      </Box>
      <Grid sx={portalBoxStyle} ref={portalRef} />
    </Grid>
  );
};
export default AppShell;
