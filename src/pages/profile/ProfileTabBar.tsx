import {
  Badge,
  Button,
  Flex,
  HStack,
  Tab,
  TabList,
  Tabs,
} from '@chakra-ui/react';
import {
  ChatAltIcon,
  CheckIcon,
  PencilIcon,
  UserAddIcon,
  UserIcon,
  XIcon,
} from '@heroicons/react/outline';
import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import HeroIcon from '../../components/chakra-ui/HeroIcon';

interface Props {
  isEditing?: boolean;
  isUploading?: boolean;
  isMine?: boolean;
  followed?: boolean;
  followingCount?: number;
  editOn?: Function;
  editOff?: Function;
  onSave?: Function;
  toggleFollow?: Function;
}

const ProfileTabBar: React.FC<Props> = ({
  isEditing = false,
  isUploading = false,
  isMine = false,
  followed = false,
  followingCount = 0,
  editOff,
  editOn,
  onSave,
  toggleFollow,
}) => {
  const matches = [
    useMatch(useResolvedPath('feed').pathname),
    useMatch(useResolvedPath('photos').pathname),
    useMatch(useResolvedPath('following').pathname),
  ];
  let tabIndex = matches.findIndex((obj) => !!obj);
  tabIndex = tabIndex === -1 ? 0 : tabIndex;

  const editHandler = (_event: React.MouseEvent) => {
    if (editOn) editOn();
  };

  const cancelHandler = (_event: React.MouseEvent) => {
    if (editOff) editOff();
  };

  const saveHandler = (_event: React.MouseEvent) => {
    if (onSave) onSave();
  };

  const followHandler = (_event: React.MouseEvent) => {
    if (toggleFollow) toggleFollow();
  };

  const ChatButtonJSX = (
    <Button leftIcon={<HeroIcon as={ChatAltIcon} />} mx={2}>
      Chat
    </Button>
  );

  const FollowButtonJSX = (
    <Button
      leftIcon={<HeroIcon as={UserAddIcon} />}
      mx={2}
      colorScheme="twitter"
      onClick={followHandler}
    >
      Follow
    </Button>
  );

  const UnfollowButtonJSX = (
    <Button
      leftIcon={<HeroIcon as={CheckIcon} />}
      mx={2}
      onClick={followHandler}
    >
      Following
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

  const flexStyle = {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: { base: 'column-reverse', md: 'row' },
    paddingTop: { base: 4, md: 0 },
  };

  return (
    <Flex sx={flexStyle}>
      <Tabs index={tabIndex}>
        <TabList mt={2}>
          <Link to="feed">
            <Tab>Feed</Tab>
          </Link>
          <Link to="photos">
            <Tab>Photos</Tab>
          </Link>
          <Link to="following">
            <Tab>
              Following
              <Badge ml={2} colorScheme={tabIndex === 2 ? 'blue' : 'gray'}>
                {followingCount}
              </Badge>
            </Tab>
          </Link>
        </TabList>
      </Tabs>
      <HStack pb={2}>
        {!isMine && !followed && FollowButtonJSX}
        {!isMine && followed && UnfollowButtonJSX}
        {!isMine && ChatButtonJSX}
        {isMine && !isEditing && EditButtonJSX}
        {isMine && isEditing && !isUploading && CancelButtonJSX}
        {isMine && isEditing && SaveButtonJSX}
      </HStack>
    </Flex>
  );
};
export default ProfileTabBar;
