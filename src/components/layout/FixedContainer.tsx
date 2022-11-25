import { Flex } from '@chakra-ui/react';
import { CSSProperties, forwardRef } from 'react';
import useWindowDimensions from '../../hooks/useWindowDimensions';

interface Props {
  flexDirection?: CSSProperties['flexDirection'];
  children: React.ReactNode;
}

const FixedContainer = forwardRef<HTMLDivElement, Props>(
  ({ flexDirection, children }, ref) => {
    const style = {
      width: '100%',
      height: `${useWindowDimensions().windowHeight}px`,
      pointerEvents: 'none',
      position: 'fixed',
      zIndex: '1',
      top: '0',
      left: '0',
      flexDirection: flexDirection ?? 'column',
      alignItems: 'stretch',
    };

    return (
      <Flex sx={style} ref={ref}>
        {children}
      </Flex>
    );
  }
);
export default FixedContainer;
