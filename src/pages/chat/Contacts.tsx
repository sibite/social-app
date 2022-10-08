import { VStack } from '@chakra-ui/react';
import Contact from './Contact';

const Contacts: React.FC = () => {
  const style = {
    w: 'full',
    h: 'full',
    p: 3,
  };

  return <VStack sx={style} />;
};

export default Contacts;
