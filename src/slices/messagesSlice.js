import { createSlice } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channelsSlice';

const slice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    getMessages(state, { payload }) {
      state.push(...payload.messages);
    },
    addMessage(state, { payload }) {
      state.push(payload);
    },
  },
  extraReducers: {
    [channelsActions.removeChannel](state, { payload }) {
      state.filter((message) => message.channelId !== payload.id);
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
