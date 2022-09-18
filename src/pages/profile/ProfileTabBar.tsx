import { Flex, Tabs, TabList, Tab, Button } from '@chakra-ui/react';
import { ChatAltIcon, PencilIcon, CheckIcon } from '@heroicons/react/outline';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import HeroIcon from '../../components/chakra-ui/HeroIcon';

interface Props {
  isEditing?: boolean;
  isMine?: boolean;
  editOn?: Function;
  editOff?: Function;
}

const ProfileTabBar: React.FC<Props> = ({
  isEditing = false,
  isMine = false,
  editOff,
  editOn,
}) => {
  const match = useMatch(useResolvedPath('photos').pathname);
  const tabIndex = match ? 1 : 0;

  const editHandler = (_event: React.MouseEvent) => {
    if (editOn) editOn();
  };

  const saveHandler = (_event: React.MouseEvent) => {
    if (editOff) editOff();
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

  const SaveButtonJSX = (
    <Button
      leftIcon={<HeroIcon as={CheckIcon} inButton />}
      mx={2}
      onClick={saveHandler}
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
      {isMine || ChatButtonJSX}
      {isMine && !isEditing && EditButtonJSX}
      {isMine && isEditing && SaveButtonJSX}
    </Flex>
  );
};
export default ProfileTabBar;
