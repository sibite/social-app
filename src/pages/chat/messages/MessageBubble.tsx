import { Box, Text, Tooltip, useColorModeValue } from '@chakra-ui/react';

interface Props {
  colored?: boolean;
  tooltipPlacement?: 'left' | 'right';
  dateString?: string;
  children: React.ReactNode;
}

const MessageBubble: React.FC<Props> = ({
  colored,
  tooltipPlacement,
  dateString,
  children,
}) => {
  const darkBgColor = colored ? 'blue.700' : 'gray.700';
  const lightBgColor = colored ? 'blue.100' : 'gray.200';

  const bgColor = useColorModeValue(lightBgColor, darkBgColor);

  return (
    <Tooltip
      key="box"
      placement={tooltipPlacement ?? 'auto'}
      label={dateString}
      aria-label={`A tooltip (${dateString})`}
    >
      <Box
        py="6px"
        px="11px"
        borderRadius={8}
        marginInlineStart={0}
        bgColor={bgColor}
      >
        <Text key="text" whiteSpace="pre-wrap">
          {children}
        </Text>
      </Box>
    </Tooltip>
  );
};
export default MessageBubble;
