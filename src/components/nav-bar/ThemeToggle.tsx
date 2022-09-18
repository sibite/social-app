import {
  ColorModeWithSystem,
  IconButton,
  Tooltip,
  useColorMode,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@heroicons/react/outline';
import HeroIcon from '../chakra-ui/HeroIcon';

const colorModes: ColorModeWithSystem[] = ['dark', 'light'];
const icons = [MoonIcon, SunIcon];

const ThemeToggle: React.FC = () => {
  const { colorMode, setColorMode } = useColorMode();
  const colorModeId = colorModes.indexOf(colorMode);

  const toggleColorMode = () => {
    const nextId = (colorModeId + 1) % 2;
    setColorMode(colorModes[nextId]);
  };

  return (
    <Tooltip label="Toggle color mode" aria-label="A tooltip">
      <IconButton
        onClick={toggleColorMode}
        variant="ghost"
        aria-label="Toggle color mode"
        icon={<HeroIcon as={icons[(colorModeId + 1) % 2]} />}
      />
    </Tooltip>
  );
};

export default ThemeToggle;
