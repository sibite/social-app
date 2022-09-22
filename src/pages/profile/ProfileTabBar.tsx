import { Flex, Tabs, TabList, Tab, Button, HStack } from '@chakra-ui/react';
import {
  ChatAltIcon,
  PencilIcon,
  CheckIcon,
  XIcon,
} from '@heroicons/react/outline';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import HeroIcon from '../../components/chakra-ui/HeroIcon';

interface Props {
  isEditing?: boolean;
  isUploading?: boolean;
  isMine?: boolean;
  editOn?: Function;
  editOff?: Function;
  onSave?: Function;
}

const ProfileTabBar: React.FC<Props> = ({
  isEditing = false,
  isUploading = false,
  isMine = false,
  editOff,
  editOn,
  onSave,
}) => {
  const match = useMatch(useResolvedPath('photos').pathname);
  const tabIndex = match ? 1 : 0;

  const editHandler = (_event: React.MouseEvent) => {
    if (editOn) editOn();
  };

  const cancelHandler = (_event: React.MouseEvent) => {
    if (editOff) editOff();
  };

  const saveHandler = (_event: React.MouseEvent) => {
    if (onSave) onSave();
  };

  const ChatButtonJSX = (
    <Button leftIcon={<HeroIcon as={ChatAltIcon} />} mx={2}>
      Chat
    </Button>
  );

  const EditButtonJSX = (
    <Button
      leftIcon={<HeroIcon as={PencilIcon} inButton />}
      mx={2}
      onClick={editHandler}
    >
      Edit profile
    </Button>
  );

  const CancelButtonJSX = (
    <Button
      leftIcon={<HeroIcon as={XIcon} inButton />}
      mx={2}
      onClick={cancelHandler}
    >
      Cancel
    </Button>
  );

  const SaveButtonJSX = (
    <Button
      leftIcon={<HeroIcon as={CheckIcon} inButton />}
      mx={2}
      onClick={saveHandler}
      isLoading={isUploading}
      loadingText="Updating"
    >
      Save changes
    </Button>
  );

  return (
    <Flex width="100%" justify="space-between">
      <Tabs defaultIndex={tabIndex}>
        <TabList mt={2}>
          <Link to="feed">
            <Tab>Feed</Tab>
          </Link>
          <Link to="photos">
            <Tab>Photos</Tab>
          </Link>
        </TabList>
      </Tabs>
      <HStack pb={2}>
        {isMine || ChatButtonJSX}
        {isMine && !isEditing && EditButtonJSX}
        {isMine && isEditing && !isUploading && CancelButtonJSX}
        {isMine && isEditing && SaveButtonJSX}
      </HStack>
    </Flex>
  );
};
export default ProfileTabBar;
