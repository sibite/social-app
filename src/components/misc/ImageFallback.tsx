import { Center, Spinner, VStack, Text, CenterProps } from '@chakra-ui/react';
import { ExclamationIcon } from '@heroicons/react/solid';
import HeroIcon from '../chakra-ui/HeroIcon';

interface Props extends Omit<CenterProps, 'fill'> {
  fill?: boolean;
  pad?: boolean;
  isError?: boolean;
}

const ImageFallback: React.FC<Props> = ({ fill, pad, isError, ...rest }) => (
  <Center
    className="fallback"
    width="100%"
    height={fill ? '100%' : 'auto'}
    padding={pad ? '50px' : '0px'}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...rest}
  >
    {isError ? (
      <VStack spacing={1} opacity={0.7} textAlign="center" px={1}>
        <HeroIcon as={ExclamationIcon} />
        <Text>Image not found</Text>
      </VStack>
    ) : (
      <Spinner />
    )}
  </Center>
);
export default ImageFallback;
