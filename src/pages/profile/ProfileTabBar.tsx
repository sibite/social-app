import { Badge, Button, Flex, Tab, TabList, Tabs } from '@chakra-ui/react';
import {
  ChatAltIcon,
  CheckIcon,
  PencilIcon,
  UserAddIcon,
  XIcon,
} from '@heroicons/react/outline';
import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import HeroIcon from '../../components/chakra-ui/HeroIcon';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';

interface Props {
  profileId: string;
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
  profileId,
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

  const isAuthenticated = useIsAuthenticated();

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
    <Button
      as={Link}
      to={`/messages/${profileId}`}
      leftIcon={<HeroIcon as={ChatAltIcon} />}
    >
      Chat
    </Button>
  );

  const FollowButtonJSX = (
    <Button
      leftIcon={<HeroIcon as={UserAddIcon} />}
      colorScheme="twitter"
      onClick={followHandler}
    >
      Follow
    </Button>
  );

  const UnfollowButtonJSX = (
    <Button leftIcon={<HeroIcon as={CheckIcon} />} onClick={followHandler}>
      Following
    </Button>
  );

  const EditButtonJSX = (
    <Button
      leftIcon={<HeroIcon as={PencilIcon} inButton />}
      onClick={editHandler}
    >
      Edit profile
    </Button>
  );

  const CancelButtonJSX = (
    <Button leftIcon={<HeroIcon as={XIcon} inButton />} onClick={cancelHandler}>
      Cancel
    </Button>
  );

  const SaveButtonJSX = (
    <Button
      leftIcon={<HeroIcon as={CheckIcon} inButton />}
      colorScheme="twitter"
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
        <TabList mt={2} flexWrap="wrap">
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
      <Flex pb={2} gap={2} flexWrap="wrap">
        {isAuthenticated && (
          <>
            {!isMine && !followed && FollowButtonJSX}
            {!isMine && followed && UnfollowButtonJSX}
            {!isMine && ChatButtonJSX}
            {isMine && !isEditing && EditButtonJSX}
            {isMine && isEditing && !isUploading && CancelButtonJSX}
            {isMine && isEditing && SaveButtonJSX}
          </>
        )}
      </Flex>
    </Flex>
  );
};
export default ProfileTabBar;
