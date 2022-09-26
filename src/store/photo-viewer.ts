import { createSlice } from '@reduxjs/toolkit';

export interface PhotoViewerState {
  visible: boolean;
  mediaIds: string[];
  initialIndex: number;
}

const initialState: PhotoViewerState = {
  visible: false,
  mediaIds: [],
  initialIndex: 0,
};

export const photoViewerSlice = createSlice({
  name: 'photoViewer',
  initialState,
  reducers: {
    openMediaGroup: (
      state,
      {
        payload,
      }: {
        type: string;
        payload: { mediaIds: string[]; initialIndex?: number };
      }
    ) => ({
      mediaIds: payload.mediaIds,
      visible: !!payload.mediaIds.length,
      initialIndex: payload.initialIndex ?? 0,
    }),
    closeMediaGroup: (state) => ({
      mediaIds: [],
      visible: false,
      initialIndex: 0,
    }),
  },
});

export const { openMediaGroup, closeMediaGroup } = photoViewerSlice.actions;

export default photoViewerSlice.reducer;
