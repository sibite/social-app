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
  color?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => any;
}

const ProfileEditableDescription: React.FC<Props> = ({
  description,
  color,
  onChange,
}) => (
  <Editable
    textAlign="center"
    width="100%"
    px={4}
    defaultValue={description}
    isPreviewFocusable={false}
  >
    <EditablePreview color={color} mb={2} whiteSpace="pre-line" width="100%" />
    <Input
      as={EditableTextarea}
      height={100}
      width="100%"
      onChange={onChange}
    />
    <EditableControls />
  </Editable>
);
export default ProfileEditableDescription;
