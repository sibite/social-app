/* eslint-disable react/jsx-props-no-spreading */
import { Link, LinkProps, useColorModeValue } from '@chakra-ui/react';

const MessageLink: React.FC<LinkProps> = ({ children, ...rest }) => {
  const style = {
    color: 'inherit',
    textDecoration: 'underline',
    _hover: {
      background: useColorModeValue('rgba(0,0,0,0.1)', 'rgba(255,255,255,0.2)'),
    },
  };

  return (
    <Link sx={style} {...rest}>
      {children}
    </Link>
  );
};
export default MessageLink;
