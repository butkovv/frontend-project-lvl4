import { createAction } from 'redux-actions';

export const getChannels = createAction('CHANNELS_GET');
export const setCurrentChannel = createAction('CHANNELS_SET');
export const createChannel = createAction('CHANNELS_CREATE');
export const removeChannel = createAction('CHANNELS_REMOVE');
export const renameChannel = createAction('CHANNELS_RENAME');
export const getMessages = createAction('MESSAGES_GET');
export const addMessage = createAction('MESSAGES_ADD');
export const showModal = createAction('MODAL_SHOW');
export const setModalType = createAction('MODAL_SET');
export const setModalExtra = createAction('MODAL_EXTRA');
