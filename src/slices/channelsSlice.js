/* eslint-disable no-param-reassign */
import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../routes';

const createChannel = createAsyncThunk(
  'channels/createChannel',
  async ({ name }) => {
    const data = {
      data: {
        attributes: { name },
      },
    };
    const url = routes.channelsPath();
    axios.post(url, data);
  },
);

const removeChannel = createAsyncThunk(
  'channels/removeChannel',
  async ({ id }) => {
    const url = routes.channelPath(id);
    await axios.delete(url);
  },
);

const renameChannel = createAsyncThunk(
  'channels/renameChannel',
  async ({ id, name }) => {
    const data = {
      data: {
        attributes: { name },
      },
    };
    const url = routes.channelPath(id);
    await axios.patch(url, data);
  },
);

const slice = createSlice({
  name: 'channels',
  initialState: {
    items: [],
    currentChannelId: null,
  },
  reducers: {
    getChannelsSuccess(state, { payload }) {
      state.items.push(...payload.channels);
    },
    setCurrentChannel(state, { payload }) {
      state.currentChannelId = payload.id;
    },
    createChannelSuccess(state, { payload }) {
      state.items.push(payload);
    },
    renameChannelSuccess(state, { payload: { id, name } }) {
      const channel = state.items.find((ch) => ch.id === id);
      channel.name = name;
    },
    removeChannelSuccess(state, { payload }) {
      state.items = state.items.filter((channel) => channel.id !== payload.id);
      state.currentChannelId = state.items[0].id;
    },
    /* extraReducers: {
      [createChannel.fulfilled]() {},
      [createChannel.rejected]() {
        throw new Error();
      },
      [removeChannel.fulfilled]() {},
      [removeChannel.rejected]() {
        throw new Error();
      },
      [renameChannel.fulfilled]() {},
      [renameChannel.rejected]() {
        throw new Error();
      },
    }, */
  },
});

const { actions } = slice;
export {
  actions, createChannel, removeChannel, renameChannel,
};
export default slice.reducer;
