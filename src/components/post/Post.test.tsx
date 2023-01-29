import { setMedia } from 'mock-match-media/dist';
import { render, screen } from '../../test-utils';
import Post from './Post';

jest.mock('../../store/feed-api', () => {
  const originalModule = jest.requireActual('../../store/feed-api');

  return {
    __esModule: true,
    ...originalModule,
    useGetCommentsQuery: () => ({
      isLoading: false,
      data: [
        {
          _id: '1',
          postId: '1',
          creatorId: '1',
          date: 0,
          content: 'string',
          fullName: 'Meagan Rust',
        },
      ],
    }),
  };
});

const setup = () => {
  render(
    <Post
      name="Victoria Mosquito"
      commentsCount={20}
      dateString="Yesterday at 15:50"
      likedBy={['dsadas', 'vcxvxc', 'hdtyhsadds', 'retwoifj']}
      options={{ delete: true, withMedia: false }}
      postId="1"
    />
  );
};

describe('Post component', () => {
  beforeEach(() => {
    setMedia({
      width: '1920px',
    });
  });

  test('renders name', () => {
    setup();
    const nameEl = screen.getByText('Victoria Mosquito');
    expect(nameEl).toBeInTheDocument();
  });

  test('renders date', () => {
    setup();
    const dateEl = screen.getByText('Yesterday at 15:50');
    expect(dateEl).toBeInTheDocument();
  });
});
