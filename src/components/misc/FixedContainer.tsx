import { Flex } from '@chakra-ui/react';
import { forwardRef } from 'react';

interface Props {
  children: React.ReactNode;
}

const FixedContainer = forwardRef<HTMLDivElement, Props>(
  ({ children }, ref) => {
    const style = {
      width: '100%',
      height: '100vh',
      pointerEvents: 'none',
      position: 'fixed',
      zIndex: '1000',
      top: '0',
      left: '0',
      flexDirection: 'column',
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
