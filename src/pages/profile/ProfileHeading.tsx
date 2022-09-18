import { Center, Heading, Text } from '@chakra-ui/react';
import ProfileEditableDescription from './ProfileEditableDescription';

interface Props {
  name?: string;
  description?: string;
  isEditing?: boolean;
}

const ProfileHeading: React.FC<Props> = ({ name, description, isEditing }) => (
  <>
    <Heading as="h1" size="lg">
      {name}
    </Heading>
    {isEditing || (
      <Text maxWidth="400px" opacity={0.8} px={4} textAlign="center">
        {description}
      </Text>
    )}
    {isEditing && (
      <Center>
        <ProfileEditableDescription description={description} />
      </Center>
    )}
  </>
);
export default ProfileHeading;
