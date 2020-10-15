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
  [actions.renameChannel](state, { payload }) {
    const { channels: { byId, allIds }, currentChannelId } = state;
    const { id, name } = payload;
    const updatedElement = { ...byId[id], name };
    return {
      currentChannelId,
      channels: {
        byId: { ...byId, [id]: updatedElement },
        allIds,
      },
    };
  },
  [actions.removeChannel](state, { payload }) {
    const { channels: { byId, allIds }, currentChannelId } = state;
    return {
      currentChannelId,
      channels: {
        byId: _.omit(byId, payload.id),
        allIds: allIds.filter((id) => (id !== payload.id)),
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
  [actions.removeChannel](state, { payload }) {
    const { byId } = state;
    const channelId = payload.id;
    const updatedMessages = _.omitBy(byId, (msg) => msg.channelId === channelId);
    return {
      byId: updatedMessages,
      allIds: Object.keys(updatedMessages),
    };
  },
},
{ byId: {}, allIds: [] });

const modal = handleActions({
  [actions.setModalType](state, { payload }) {
    return { ...state, type: payload.type };
  },
  [actions.showModal](state, { payload }) {
    return { ...state, show: payload.show };
  },
  [actions.setModalExtra](state, { payload }) {
    return { ...state, extra: payload };
  },
}, { show: false, type: null, extra: null });

export default combineReducers({
  channelsInfo,
  messages,
  modal,
});
