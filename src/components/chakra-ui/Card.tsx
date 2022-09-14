import { Box, useStyleConfig } from '@chakra-ui/react';

type Props = React.ComponentProps<typeof Box>;

const Card: React.FC<Props> = ({ variant, ...rest }) => {
  const styles = useStyleConfig('Card', { variant });
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Box __css={styles} {...rest} />;
};

export default Card;
