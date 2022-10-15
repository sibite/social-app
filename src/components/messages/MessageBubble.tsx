import {
  Box,
  Text,
  Tooltip,
  useBoolean,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';

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
  const [isExpanded, setIsExpanded] = useBoolean(false);

  const darkBgColor = colored ? 'blue.700' : 'gray.700';
  const lightBgColor = colored ? 'blue.100' : 'gray.200';

  const bgColor = useColorModeValue(lightBgColor, darkBgColor);

  const bubbleStyle = {
    py: '6px',
    px: '11px',
    borderRadius: 8,
    marginInlineStart: 0,
    bgColor,
  };

  const textStyle = {
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  };

  const isDesktop = useBreakpointValue({ base: false, md: true });

  if (isDesktop)
    return (
      <Tooltip
        key="box"
        closeOnPointerDown={false}
        placement={tooltipPlacement ?? 'auto'}
        label={dateString}
        aria-label={`A tooltip (${dateString})`}
      >
        <Box sx={bubbleStyle}>
          <Text sx={textStyle}>{children}</Text>
        </Box>
      </Tooltip>
    );

  return (
    <>
      <Box sx={bubbleStyle} onClick={setIsExpanded.toggle}>
        <Text sx={textStyle}>{children}</Text>
      </Box>
      {isExpanded && (
        <Text fontSize="xs" opacity="0.7" px={1} onClick={setIsExpanded.toggle}>
          {dateString}
        </Text>
      )}
    </>
  );
};
export default MessageBubble;
