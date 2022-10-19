import {
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react';
import { useRef } from 'react';

interface Props {
  url: string;
  children: React.ReactNode;
}

const SharePopover: React.FC<Props> = ({ url, children }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const openHandler = () => {
    setTimeout(() => {
      inputRef.current!.select();
      inputRef.current!.setSelectionRange(0, 99999);
      if (document.execCommand) document.execCommand('copy');
    }, 200);
  };

  return (
    <Popover onOpen={openHandler}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <PopoverHeader pt={4} fontWeight="bold" border="0">
          <Text>Sharing link</Text>
        </PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <Input readOnly ref={inputRef} value={url} />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
export default SharePopover;
