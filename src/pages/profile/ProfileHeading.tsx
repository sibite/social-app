import { Center, Heading, Text } from '@chakra-ui/react';
import ProfileEditableDescription from './ProfileEditableDescription';

interface Props {
  name?: string;
  description?: string;
  isEditing?: boolean;
  isUploading?: boolean;
  onChange?: (newDescription: string) => any;
}

const ProfileHeading: React.FC<Props> = ({
  name,
  description,
  isEditing,
  isUploading = false,
  onChange,
}) => {
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDescription = event.currentTarget.value;
    if (onChange) onChange(newDescription);
  };

  return (
    <>
      <Heading as="h1" size="lg">
        {name}
      </Heading>
      {(!isEditing || isUploading) && (
        <Text maxWidth="400px" opacity={0.8} px={4} textAlign="center">
          {description}
        </Text>
      )}
      {isEditing && !isUploading && (
        <Center>
          <ProfileEditableDescription
            description={description}
            onChange={changeHandler}
          />
        </Center>
      )}
    </>
  );
};
export default ProfileHeading;
