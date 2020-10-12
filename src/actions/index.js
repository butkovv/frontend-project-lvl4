import { createAction } from 'redux-actions';

export const getChannels = createAction('CHANNELS_GET');
export const setCurrentChannel = createAction('CHANNELS_SET');
export const getMessages = createAction('MESSAGES_GET');
export const addMessage = createAction('MESSAGES_ADD');
