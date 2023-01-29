import userEvent from '@testing-library/user-event';
import { render, screen } from '../../test-utils';
import PostButtons from './PostButtons';

describe('PostButtons component', () => {
  const onCommentsToggle = jest.fn();

  const setup = () => {
    render(
      <PostButtons
        commentsCount={2425}
        numOfLikes={5029}
        isLiked
        onCommentsToggle={onCommentsToggle}
        postId="testing"
      />
    );
  };

  // const useToggleLikeMutation = jest.fn();

  // useToggleLikeMutation.mockResolvedValue([() => {}]);

  test('renders comments count', () => {
    setup();
    const count = screen.getByText('2425');
    expect(count).toBeInTheDocument();
  });

  test('renders likes count', () => {
    setup();
    const count = screen.getByText('5029');
    expect(count).toBeInTheDocument();
  });

  test('toggles comments', () => {
    setup();
    const buttons = screen.getAllByRole('button');
    const commentsBtn = buttons[1];
    userEvent.click(commentsBtn);
    expect(onCommentsToggle).toBeCalled();
  });
});
