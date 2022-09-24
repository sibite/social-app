import { Icon } from '@chakra-ui/react';

interface Props extends React.ComponentProps<typeof Icon> {
  inButton?: boolean;
  posRight?: boolean;
}

const HeroIcon: React.FC<Props> = ({
  boxSize = '1.4em',
  inButton = false,
  posRight = false,
  ...rest
}) => {
  const margin = inButton ? '-3px' : '0px';
  return (
    <Icon
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      boxSize={boxSize}
      ml={!posRight ? margin : '0px'}
      mr={posRight ? margin : '0px'}
    />
  );
};
export default HeroIcon;
