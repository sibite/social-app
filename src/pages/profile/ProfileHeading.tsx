import { Center, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import InteractiveContent from '../../components/misc/InteractiveContent';
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
  description = '',
  isEditing,
  isUploading = false,
  onChange,
}) => {
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDescription = event.currentTarget.value;
    if (onChange) onChange(newDescription);
  };

  const descriptionColor = useColorModeValue('gray.700', 'gray.400');

  return (
    <>
      <Heading as="h1" size="lg" textAlign="center">
        {name}
      </Heading>
      {(!isEditing || isUploading) && (
        <Text
          maxWidth="50ch"
          textAlign="center"
          whiteSpace="pre-line"
          color={descriptionColor}
        >
          <InteractiveContent textContent={description} />
        </Text>
      )}
      {isEditing && !isUploading && (
        <Center width="100%" maxWidth="50ch">
          <ProfileEditableDescription
            description={description}
            color={descriptionColor}
            onChange={changeHandler}
          />
        </Center>
      )}
    </>
  );
};
export default ProfileHeading;
