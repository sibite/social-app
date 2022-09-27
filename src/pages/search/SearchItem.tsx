import { Avatar, Text, Flex, Heading, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { UserPublicType } from '../../../server/api-types/auth';
import Card from '../../components/chakra-ui/Card';

type Props = Pick<
  UserPublicType,
  'fullName' | 'avatarSrc' | 'description' | '_id'
>;

const SearchItem: React.FC<Props> = ({
  _id,
  fullName,
  description,
  avatarSrc,
}) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(`/profile/${_id}`);
  };

  return (
    <Card p={3} as="button" onClick={clickHandler}>
      <Flex align="flex-start" gap={2}>
        <Avatar name={avatarSrc ? undefined : fullName} src={avatarSrc} />
        <VStack align="flex-start" flexGrow={1} spacing={1} overflow="hidden">
          <Heading as="span" size="sm">
            {fullName}
          </Heading>
          <Text
            opacity={0.6}
            fontSize="sm"
            maxWidth="100%"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {description}
          </Text>
        </VStack>
      </Flex>
    </Card>
  );
};
export default SearchItem;
