/* eslint-disable react/jsx-props-no-spreading */
import {
  ButtonGroup,
  Editable,
  EditablePreview,
  EditableTextarea,
  Flex,
  IconButton,
  IconButtonProps,
  Input,
  useEditableControls,
} from '@chakra-ui/react';
import { PencilAltIcon, XIcon, CheckIcon } from '@heroicons/react/outline';
import HeroIcon from '../../components/chakra-ui/HeroIcon';

const EditableControls = () => {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  return isEditing ? (
    <ButtonGroup justifyContent="center" size="sm" mt={1}>
      <IconButton
        icon={<HeroIcon as={CheckIcon} />}
        {...(getSubmitButtonProps() as IconButtonProps)}
      />
      <IconButton
        icon={<HeroIcon as={XIcon} />}
        {...(getCancelButtonProps() as IconButtonProps)}
      />
    </ButtonGroup>
  ) : (
    <Flex justifyContent="center">
      <IconButton
        size="sm"
        icon={<HeroIcon as={PencilAltIcon} />}
        {...(getEditButtonProps() as IconButtonProps)}
      />
    </Flex>
  );
};

interface Props {
  description?: string;
}

const ProfileEditableDescription: React.FC<Props> = ({ description }) => (
  <Editable
    textAlign="center"
    maxWidth="400px"
    px={4}
    defaultValue={description}
    isPreviewFocusable={false}
  >
    <EditablePreview opacity={0.8} mb={2} />
    <Input as={EditableTextarea} height={100} width={300} maxWidth="100%" />
    <EditableControls />
  </Editable>
);
export default ProfileEditableDescription;
