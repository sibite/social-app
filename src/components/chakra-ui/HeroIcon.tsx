import { Icon } from '@chakra-ui/react';

interface Props extends React.ComponentProps<typeof Icon> {
  inButton?: boolean;
}

const HeroIcon: React.FC<Props> = ({
  boxSize = '1.4em',
  inButton = false,
  ...rest
}) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...rest} boxSize={boxSize} ml={inButton ? '-3px' : '0px'} />
);
export default HeroIcon;
