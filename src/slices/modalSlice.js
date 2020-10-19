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
    setModalType(state, { payload }) {
      state.type = payload.type;
    },
    showModal(state, { payload }) {
      state.show = payload.show;
    },
    setModalExtra(state, { payload }) {
      state.extra = payload;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
