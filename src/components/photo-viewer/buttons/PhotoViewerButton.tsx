/* eslint-disable react/jsx-props-no-spreading */
import { IconButton } from '@chakra-ui/react';
import HeroIcon from '../../chakra-ui/HeroIcon';

interface Props extends React.ComponentProps<typeof IconButton> {
  isVisible: boolean;
  heroicon: React.FC;
}

const PhotoViewerButton: React.FC<Props> = ({
  isVisible,
  variant = 'solid',
  heroicon,
  ...rest
}) => (
  <IconButton
    icon={<HeroIcon as={heroicon} />}
    size="md"
    colorScheme="translucent"
    variant={variant}
    visibility={isVisible ? 'visible' : 'hidden'}
    {...rest}
  />
);
export default PhotoViewerButton;
