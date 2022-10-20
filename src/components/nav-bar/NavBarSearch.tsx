import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from '@chakra-ui/react';
import { SearchIcon } from '@heroicons/react/outline';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroIcon from '../chakra-ui/HeroIcon';

const NavBarSearch: React.FC = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const searchQuery = inputRef.current!.value;
    navigate(`/search/${searchQuery}`);
  };

  const inputBgColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.200');

  const style = {
    maxWidth: '100%',
    width: '280px',
    height: 'calc(100% - 16px)',
    mr: 2,
  };

  return (
    <Flex
      as="form"
      alignItems="center"
      overflow="hidden"
      pl={2}
      onSubmit={submitHandler}
    >
      <InputGroup sx={style}>
        <InputLeftElement height="100%">
          <HeroIcon as={SearchIcon} />
        </InputLeftElement>
        <Input
          ref={inputRef}
          variant="solid"
          border="none"
          bgColor={inputBgColor}
          height="100%"
          placeholder="Search people"
        />
      </InputGroup>
    </Flex>
  );
};
export default NavBarSearch;
