/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'channels',
  initialState: {
    items: [],
    currentChannelId: null,
  },
  reducers: {
    getChannels(state, { payload }) {
      state.items.push(...payload.channels);
    },
    setCurrentChannel(state, { payload }) {
      state.currentChannelId = payload.id;
    },
    createChannel(state, { payload }) {
      state.items.push(payload);
    },
    renameChannel(state, { payload: { id, name } }) {
      const channel = state.items.find((ch) => ch.id === id);
      channel.name = name;
    },
    removeChannel(state, { payload }) {
      state.items = state.items.filter((channel) => channel.id !== payload.id);
      state.currentChannelId = state.items[0].id;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
