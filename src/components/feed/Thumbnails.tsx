import {
  SimpleGrid,
  Center,
  LightMode,
  IconButton,
  Box,
  Image,
} from '@chakra-ui/react';
import { XIcon } from '@heroicons/react/outline';
import { FileWrapper } from '../../hooks/useUploadManager';
import HeroIcon from '../chakra-ui/HeroIcon';

interface Props {
  files: FileWrapper[];
  onRemove: (id: number) => any;
}

const Thumbnails: React.FC<Props> = ({ files, onRemove }) => (
  <SimpleGrid columns={[3, 4, 5]} width="100%" spacing={2}>
    {files.map(({ dataUrl, id }) => (
      <Box
        position="relative"
        sx={{
          '& .remove-button': { visibility: 'hidden' },
          '&:hover .remove-button': { visibility: 'visible' },
        }}
      >
        <Image
          objectFit="cover"
          boxSize="100%"
          width="100px"
          height="100px"
          src={dataUrl}
          key={id}
          borderRadius="md"
        />
        <Center boxSize="100%" position="absolute" top="0">
          <LightMode>
            <IconButton
              colorScheme="translucent"
              className="remove-button"
              aria-label="Remove photo"
              icon={<HeroIcon as={XIcon} />}
              onClick={() => onRemove(id)}
            />
          </LightMode>
        </Center>
      </Box>
    ))}
  </SimpleGrid>
);
export default Thumbnails;
