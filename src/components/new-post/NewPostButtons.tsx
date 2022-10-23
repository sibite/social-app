import { Button, ButtonGroup } from '@chakra-ui/react';
import { ArrowRightIcon, PhotographIcon } from '@heroicons/react/outline';
import HeroIcon from '../chakra-ui/HeroIcon';
import CustomFilePicker from '../misc/CustomFilePicker';

interface Props {
  isImportingFiles: boolean;
  isSending: boolean;
  isPostEmpty: boolean;
  filesChangeHandler: React.ChangeEventHandler;
}

const NewPostButtons: React.FC<Props> = ({
  isImportingFiles,
  isSending,
  isPostEmpty,
  filesChangeHandler,
}) => (
  <ButtonGroup alignSelf="flex-end">
    <CustomFilePicker
      onChange={filesChangeHandler}
      multiple
      accept="image/png, image/jpeg, image/webp, image/gif"
    >
      <Button
        leftIcon={<HeroIcon as={PhotographIcon} inButton />}
        isLoading={isImportingFiles}
        disabled={isSending || isImportingFiles}
        loadingText="Importing photos"
      >
        Import photos
      </Button>
    </CustomFilePicker>
    <Button
      leftIcon={<HeroIcon as={ArrowRightIcon} inButton />}
      type="submit"
      colorScheme="twitter"
      disabled={isSending || isImportingFiles || isPostEmpty}
      isLoading={isSending}
      loadingText="Posting"
    >
      Post
    </Button>
  </ButtonGroup>
);
export default NewPostButtons;
