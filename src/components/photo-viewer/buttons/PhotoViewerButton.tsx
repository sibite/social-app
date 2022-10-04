/* eslint-disable react/jsx-props-no-spreading */
import { DarkMode, IconButton, LightMode } from '@chakra-ui/react';
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
}) => {
  const ColorMode = variant !== 'ghost' ? LightMode : DarkMode;

  return (
    <ColorMode>
      <IconButton
        icon={<HeroIcon as={heroicon} />}
        size="md"
        colorScheme={variant !== 'ghost' ? 'translucent' : 'gray'}
        variant={variant}
        visibility={isVisible ? 'visible' : 'hidden'}
        {...rest}
      />
    </ColorMode>
  );
};
export default PhotoViewerButton;
