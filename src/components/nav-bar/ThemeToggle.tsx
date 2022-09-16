import {
  ColorModeWithSystem,
  IconButton,
  Tooltip,
  useColorMode,
} from '@chakra-ui/react';
import { MoonIcon, SparklesIcon, SunIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import HeroIcon from '../chakra-ui/HeroIcon';

const colorModes: ColorModeWithSystem[] = ['system', 'dark', 'light'];
const icons = [SparklesIcon, MoonIcon, SunIcon];

const ThemeToggle: React.FC = () => {
  const { colorMode, setColorMode } = useColorMode();
  const initialColorModeId = colorModes.indexOf(colorMode);
  const [colorModeId, setColorModeId] = useState(initialColorModeId);

  const toggleColorMode = () => {
    const nextColorMode = colorModes[(colorModeId + 1) % 3];
    setColorModeId(colorModeId + 1);
    setColorMode(nextColorMode);
  };

  return (
    <Tooltip label="Toggle color mode" aria-label="A tooltip">
      <IconButton
        onClick={toggleColorMode}
        aria-label="Toggle color mode"
        icon={<HeroIcon as={icons[(colorModeId + 1) % 3]} />}
      />
    </Tooltip>
  );
};

export default ThemeToggle;
