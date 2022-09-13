import { useColorModeValue } from '@chakra-ui/react';

const useBackgroundColor = () => {
  const color0 = useColorModeValue('white', 'black');
  const color50 = useColorModeValue('gray.50', 'gray.900');
  const color100 = useColorModeValue('gray.100', 'gray.800');
  const color200 = useColorModeValue('gray.200', 'gray.700');
  const color300 = useColorModeValue('gray.300', 'gray.600');
  const color400 = useColorModeValue('gray.400', 'gray.500');
  const color500 = useColorModeValue('gray.500', 'gray.400');
  const color600 = useColorModeValue('gray.600', 'gray.300');
  const color700 = useColorModeValue('gray.700', 'gray.200');
  const color800 = useColorModeValue('gray.800', 'gray.100');
  const color900 = useColorModeValue('gray.900', 'gray.50');
  const color1000 = useColorModeValue('black', 'white');

  return {
    color0,
    color50,
    color100,
    color200,
    color300,
    color400,
    color500,
    color600,
    color700,
    color800,
    color900,
    color1000,
  };
};

export default useBackgroundColor;
