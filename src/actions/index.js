import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes.js';

export const fetchChannelsRequest = createAction('CHANNELS_FETCH_REQUEST');
export const fetchChannelsSuccess = createAction('CHANNELS_FETCH_SUCCESS');
export const fetchChannelsFailure = createAction('CHANNELS_FETCH_FAILURE');

export const fetchChannels = () => async (dispatch) => {
  dispatch(fetchChannelsRequest());
  try {
    const url = routes.channelsPath();
    const response = await axios.get(url);
    dispatch(fetchChannelsSuccess({ channels: response.data.data }));
  } catch (e) {
    console.log(e);
    dispatch(fetchChannelsFailure());
    throw e;
  }
};

export const fetchMessagesRequest = createAction('MESSAGES_FETCH_REQUEST');
export const fetchMessagesSuccess = createAction('MESSAGES_FETCH_SUCCESS');
export const fetchMessagesFailure = createAction('MESSAGES_FETCH_FAILURE');

export const fetchMessages = () => async (dispatch) => {
  dispatch(fetchMessagesRequest());
  try {
    const url = routes.channelMessagesPath(0);
    const response = await axios.get(url);
    dispatch(fetchMessagesSuccess({ messages: response.data }));
  } catch (e) {
    dispatch(fetchMessagesFailure());
    throw e;
  }
};
