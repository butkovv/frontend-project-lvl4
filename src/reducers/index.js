import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import _ from 'lodash';
import * as actions from '../actions';

const channelsFetchingState = handleActions({
  [actions.fetchChannelsRequest]() {
    return 'requested';
  },
  [actions.fetchChannelsFailure]() {
    return 'failed';
  },
  [actions.fetchChannelsSuccess]() {
    return 'finished';
  },
}, 'none');

const channels = handleActions({
  [actions.fetchChannelsSuccess](state, { payload }) {
    return {
      byId: _.keyBy(payload.channels, 'id'),
      allIds: payload.channels.map((c) => c.id),
    };
  },
},
{ byId: {}, allIds: [] });

const messagesFetchingState = handleActions({
  [actions.fetchMessagesRequest]() {
    return 'requested';
  },
  [actions.fetchMessagesFailure]() {
    return 'failed';
  },
  [actions.fetchMessagesSuccess]() {
    return 'finished';
  },
}, 'none');

const messages = handleActions({
  [actions.fetchMessagesSuccess](state, { payload }) {
    return {
      byId: _.keyBy(payload.messages, 'id'),
      allIds: payload.messages.map((m) => m.id),
    };
  },
},
{ byId: {}, allIds: [] });

export default combineReducers({
  channelsFetchingState,
  channels,
  messagesFetchingState,
  messages,
});
