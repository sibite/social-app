import {
  Box,
  Text,
  Tooltip,
  useBoolean,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { useContext } from 'react';
import useBreakpointValue from '../../../hooks/wrappers/useBreakpointValue';
import PortalRefContext from '../../../store/ref-context';

interface Props {
  colored?: boolean;
  isDeleted?: boolean;
  isSending?: boolean;
  isDirectionTo?: boolean;
  dateString?: string;
  children: React.ReactNode;
}

const MessageBubble: React.FC<Props> = ({
  colored,
  isDeleted,
  isSending,
  isDirectionTo,
  dateString,
  children,
}) => {
  const [isExpanded, setIsExpanded] = useBoolean(false);
  const portalRef = useContext(PortalRefContext);

  const tooltipPlacement = isDirectionTo ? 'left' : 'right';
  const alignItems = isDirectionTo ? 'flex-end' : 'flex-start';

  const darkBgColor = colored ? 'blue.600' : 'gray.700';
  const lightBgColor = colored ? 'blue.400' : 'gray.200';

  const normalBgColor = useColorModeValue(lightBgColor, darkBgColor);
  const deletedBgColor = useColorModeValue('gray.100', 'gray.800');
  const bgColor = isDeleted || isSending ? deletedBgColor : normalBgColor;

  const bubbleStyle = {
    py: '6px',
    px: '11px',
    borderRadius: '8px',
    marginInlineStart: 0,
    bgColor,
    maxWidth: '70ch',
    color: colored && !isDeleted ? 'white' : 'inherit',
  };

  const textStyle = {
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    opacity: isDeleted || isSending ? 0.7 : 1,
  };

  const isDesktop = useBreakpointValue({ base: false, md: true });

  const ContentJSX = !isDeleted ? (
    <Text sx={textStyle}>{children}</Text>
  ) : (
    <Text sx={textStyle}>Message deleted</Text>
  );

  if (isDesktop)
    return (
      <Tooltip
        portalProps={{ containerRef: portalRef }}
        placement={tooltipPlacement ?? 'auto'}
        gutter={isDirectionTo ? 40 : 10}
        label={dateString}
        aria-label={`A tooltip (${dateString})`}
        modifiers={[{ name: 'eventListeners', enabled: false }]}
      >
        <Box sx={bubbleStyle} className="bubble">
          {ContentJSX}
        </Box>
      </Tooltip>
    );

  return (
    <VStack spacing="2px" alignItems={alignItems}>
      <Box sx={bubbleStyle} className="bubble" onClick={setIsExpanded.toggle}>
        {ContentJSX}
      </Box>
      {isExpanded && (
        <Text fontSize="xs" opacity="0.7" px={1} onClick={setIsExpanded.toggle}>
          {dateString}
        </Text>
      )}
    </VStack>
  );
};
export default MessageBubble;
