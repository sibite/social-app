import { Box, useStyleConfig } from '@chakra-ui/react';

type Props = React.ComponentProps<typeof Box>;

const AppCard: React.FC<Props> = ({ variant, ...rest }) => {
  const styles = useStyleConfig('AppCard', { variant });
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Box __css={styles} {...rest} />;
};

export default AppCard;
