import { AspectRatio, Box, Grid } from '@chakra-ui/react';
import { PostIncomingType } from '../../../server/api-types/feed';
import { useAppDispatch } from '../../store/hooks';
import { openMediaGroup } from '../../store/photo-viewer';
import PostMediaItem from './PostMediaItem';

interface Props {
  media: PostIncomingType['media'];
}

const PostMediaGroup: React.FC<Props> = ({ media }) => {
  const dispatch = useAppDispatch();

  const styleIndex = Math.min(6, media.length) - 1;

  const openMediaHandler = (mediaId: string) => {
    const mediaIds = media.map(({ _id }) => _id);
    dispatch(
      openMediaGroup({ mediaIds, initialIndex: mediaIds.indexOf(mediaId) })
    );
  };

  const gridStyles = [
    { gridTemplate: '1fr / 1fr' },
    { gridTemplate: '1fr / repeat(2, 1fr)' },
    {
      gridTemplate: '1fr 1fr / 1fr 1fr',
      '& > *:nth-child(1)': {
        gridRow: 'span 2',
      },
    },
    { gridTemplate: '1fr 1fr / 1fr 1fr' },
    {
      gridTemplate: '3fr 2fr / repeat(6, 1fr)',
      '& > *:nth-child(-n+2)': {
        gridColumn: 'span 3',
      },
      '& > *:nth-child(n+3)': {
        gridColumn: 'span 2',
      },
    },
    { gridTemplate: 'repeat(2, 1fr) / repeat(3, 1fr)' },
  ];

  const gridStyle = {
    ...gridStyles[styleIndex],
    gap: '1px',
  };
  const ratio = [undefined, 1, 2 / 1, 3 / 2, 4 / 3, 1][styleIndex];

  const mediaSlice = media.slice(0, 6);

  return (
    <Grid sx={gridStyle} boxSize="100%">
      {mediaSlice.map(({ _id, src }, index) => (
        <PostMediaItem
          mediaId={_id}
          src={src}
          key={_id}
          ratio={ratio}
          leftItemsCount={index === 5 ? media.length - 6 : 0}
          onClick={openMediaHandler}
        />
      ))}
    </Grid>
  );
};
export default PostMediaGroup;
