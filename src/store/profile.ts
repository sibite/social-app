import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

interface SocialObject {
  name: string;
  avatarSrc?: string;
  content: string;
}

export interface Comment extends SocialObject {
  date: number;
}

export interface Post extends SocialObject {
  date: number;
  photoSrc?: string;
  likes: number;
  comments: Comment[];
}

export interface ProfileState {
  name: string;
  avatarSrc?: string;
  description: string;
  feed: Post[];
  photos: any[];
}

const initialState: ProfileState = {
  avatarSrc: undefined,
  name: 'Mike Mew',
  description: 'The best orthodontist in the world',
  feed: [
    {
      date: dayjs().subtract(100, 'hour').valueOf(),
      name: 'Mike Mew',
      content: 'Look at this beautiful view!',
      photoSrc: '/beautiful-blue-view-sky.jpg',
      likes: 135,
      comments: [
        {
          name: 'Mateusz Karbowy',
          content: 'I wish I was there',
          date: dayjs().subtract(5, 'hour').valueOf(),
        },
        {
          name: 'Chris Heria',
          content: 'Perfect place to work out',
          date: dayjs().subtract(20, 'hour').valueOf(),
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
