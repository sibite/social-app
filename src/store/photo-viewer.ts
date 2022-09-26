import { createSlice } from '@reduxjs/toolkit';

export interface PhotoViewerState {
  visible: boolean;
  postId?: string;
  mediaIds?: string[];
  index: number;
}

const initialState: PhotoViewerState = {
  visible: false,
  index: 0,
};

export const photoViewerSlice = createSlice({
  name: 'photoViewer',
  initialState,
  reducers: {
    openMediaGroup: (
      state,
      action: { type: string; payload: string | string[] }
    ) => {
      if (typeof action.payload === 'string') {
        return {
          visible: true,
          index: 0,
          postId: action.payload,
        };
      }
      return {
        visible: true,
        index: 0,
        mediaIds: action.payload,
      };
    },
    setIndex: (
      state,
      action: {
        type: string;
        payload: number;
      }
    ) => {
      state.index = action.payload;
    },
    closeMediaGroup: (state) => ({
      visible: false,
      index: 0,
    }),
  },
});

export const { setIndex, openMediaGroup, closeMediaGroup } =
  photoViewerSlice.actions;

export default photoViewerSlice.reducer;
