import { Icon } from '@chakra-ui/react';

type Props = React.ComponentProps<typeof Icon>;

const HeroIcon: React.FC<Props> = ({ boxSize = '1.4em', ...rest }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...rest} boxSize={boxSize} />
);
export default HeroIcon;
