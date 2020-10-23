import io from 'socket.io-client';
import { actions } from './slices';

export default (store) => {
  const socket = io();
  socket.on('newMessage', (msg) => {
    store.dispatch(actions.addMessageSuccess(msg.data.attributes));
  });
  socket.on('newChannel', (channel) => {
    store.dispatch(actions.createChannelSuccess(channel.data.attributes));
  });
  socket.on('removeChannel', (response) => {
    store.dispatch(actions.removeChannelSuccess(response.data));
  });
  socket.on('renameChannel', (response) => {
    store.dispatch(actions.renameChannelSuccess(response.data.attributes));
  });
};
