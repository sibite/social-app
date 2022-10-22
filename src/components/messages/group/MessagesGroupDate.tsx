import { Text } from '@chakra-ui/react';

interface Props {
  dateString?: string;
}

const MessagesGroupDate: React.FC<Props> = ({ dateString }) => {
  if (dateString) return null;
  return (
    <Text width="100%" pt={3} textAlign="center" fontSize="xs" opacity="0.7">
      {dateString}
    </Text>
  );
};
export default MessagesGroupDate;
