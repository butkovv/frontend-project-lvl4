import { combineReducers } from 'redux';
import channels, {
  createChannel, removeChannel, renameChannel, actions as channelsActions,
} from './channelsSlice';
import messages, { addMessage, actions as messagesActions } from './messagesSlice';
import modal, { actions as modalActions } from './modalSlice';

export const asyncActions = {
  createChannel,
  removeChannel,
  renameChannel,
  addMessage,
};

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
