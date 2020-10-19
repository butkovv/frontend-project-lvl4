import { combineReducers } from 'redux';
import channels, { actions as channelsActions } from './channelsSlice';
import messages, { actions as messagesActions } from './messagesSlice';
import modal, { actions as modalActions } from './modalSlice';

export const actions = {
  ...channelsActions,
  ...messagesActions,
  ...modalActions,
};

export default combineReducers({
  channels,
  messages,
  modal,
});
