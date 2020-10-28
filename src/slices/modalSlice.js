/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'modal',
  initialState: {
    show: false,
    type: null,
    extra: null,
  },
  reducers: {
    showModal(state, { payload }) {
      state.type = payload.type;
      state.show = payload.show;
      state.extra = { channelId: payload.channelId };
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
