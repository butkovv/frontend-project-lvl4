import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import _ from 'lodash';
import * as actions from '../actions';

const channelsInfo = handleActions({
  [actions.getChannels](state, { payload }) {
    const { currentChannelId } = state;
    return {
      channels: {
        byId: _.keyBy(payload.channels, 'id'),
        allIds: payload.channels.map((c) => c.id),
      },
      currentChannelId,
    };
  },
  [actions.setCurrentChannel](state, { payload }) {
    const { channels } = state;
    return { channels, currentChannelId: payload.id };
  },
  [actions.createChannel](state, { payload }) {
    const { channels: { byId, allIds }, currentChannelId } = state;
    return {
      currentChannelId,
      channels: {
        byId: { ...byId, [payload.id]: payload },
        allIds: [...allIds, payload.id],
      },
    };
  },
},
{ channels: { byId: {}, allIds: [] }, currentChannelId: 1 });

const messages = handleActions({
  [actions.getMessages](state, { payload }) {
    return {
      byId: _.keyBy(payload.messages, 'id'),
      allIds: payload.messages.map((m) => m.id),
    };
  },
  [actions.addMessage](state, { payload }) {
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [payload.id]: payload },
      allIds: [...allIds, payload.id],
    };
  },
},
{ byId: {}, allIds: [] });

const modal = handleActions({
  [actions.showModal](state, { payload }) {
    return { ...state, show: payload.show };
  },
}, { show: false });

export default combineReducers({
  channelsInfo,
  messages,
  modal,
});
