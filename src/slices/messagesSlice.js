import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { actions as channelsActions } from './channelsSlice';
import routes from '../routes';

const addMessage = createAsyncThunk(
  'messages/addMessage',
  async ({ channelId, username, message }) => {
    const data = { attributes: { message, username } };
    const url = routes.channelMessagesPath(channelId);
    await axios.post(url, data);
  },
);

const slice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    getMessagesSuccess(state, { payload }) {
      state.push(...payload.messages);
    },
    addMessageSuccess(state, { payload }) {
      state.push(payload);
    },
  },
  extraReducers: {
    [addMessage.fulfilled]() { },
    [addMessage.rejected]() {
      throw new Error();
    },
    [channelsActions.removeChannelSuccess]:
    (state, { payload: { id } }) => state.filter((message) => message.channelId !== id),
  },
});

const { actions } = slice;
export { actions, addMessage };
export default slice.reducer;
