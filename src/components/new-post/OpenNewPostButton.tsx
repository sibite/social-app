import { Box, Text, useColorModeValue } from '@chakra-ui/react';

interface Props {
  onClick: Function;
}

const OpenNewPostButton: React.FC<Props> = ({ onClick }) => {
  const style = {
    width: '100%',
    fontWeight: 'normal',
    textAlign: 'left',
    cursor: 'text',
    borderRadius: 'lg',
    padding: 4,
    bgColor: useColorModeValue('white', 'gray.800'),
    '&:hover': {
      boxShadow: useColorModeValue('0px 5px 10px rgba(0,0,0,0.08)', 'none'),
    },
    transition: 'box-shadow 300ms',
  };

  return (
    <Box as="button" sx={style} onClick={() => onClick()}>
      <Text opacity={0.7}>Type what is on your mind...</Text>
    </Box>
  );
};
export default OpenNewPostButton;
