import { Center, Spinner } from '@chakra-ui/react';

interface Props {
  fill?: boolean;
  pad?: boolean;
}

const ImageFallback: React.FC<Props> = ({ fill, pad }) => (
  <Center
    width="100%"
    height={fill ? '100%' : 'auto'}
    padding={pad ? '50px' : '0px'}
  >
    <Spinner />
  </Center>
);
export default ImageFallback;
