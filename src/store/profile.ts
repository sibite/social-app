import { createSlice } from '@reduxjs/toolkit';
import dayjs, { Dayjs } from 'dayjs';

interface SocialObject {
  name: string;
  avatarSrc?: string;
  content: string;
}

export interface Comment extends SocialObject {
  date: Dayjs;
}

export interface Post extends SocialObject {
  date: Dayjs;
  photoSrc?: string;
  likes: number;
  comments: Comment[];
}

export interface ProfileState extends SocialObject {
  feed: Post[];
  photos: any[];
}

const initialState: ProfileState = {
  avatarSrc: undefined,
  name: 'Mike Mew',
  content: 'The best orthodontist in the world',
  feed: [
    {
      date: dayjs().subtract(100, 'hour'),
      name: 'Mike Mew',
      content: 'Look at this beautiful view!',
      photoSrc: '../beautiful-blue-view-sky.jpg',
      likes: 135,
      comments: [
        {
          name: 'Mateusz Karbowy',
          content: 'I wish I was there',
          date: dayjs().subtract(5, 'hour'),
        },
        {
          name: 'Chris Heria',
          content: 'Perfect place to work out',
          date: dayjs().subtract(20, 'hour'),
        },
      ],
    },
  ],
  photos: [
    'https://picsum.photos/200',
    'https://picsum.photos/300',
    'https://picsum.photos/310',
    'https://picsum.photos/230',
    'https://picsum.photos/500',
    'https://picsum.photos/480',
    'https://picsum.photos/390',
    'https://picsum.photos/600',
  ],
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
});

export default profileSlice.reducer;
