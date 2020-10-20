import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import faker from 'faker';
import io from 'socket.io-client';
import App from './components/App.jsx';
import '../assets/application.scss';
import reducers, { actions } from './slices';
import UserNameContext from './context.jsx';

export default (gon) => {
  if (!Cookies.get('name')) {
    Cookies.set('name', faker.internet.userName());
  }
  const userName = Cookies.get('name');
  console.log('gon', gon);

  const store = configureStore({
    reducer: reducers,
  });

  store.dispatch(actions.getChannelsSuccess({ channels: gon.channels }));
  store.dispatch(actions.getMessagesSuccess({ messages: gon.messages }));
  store.dispatch(actions.setCurrentChannel({ id: gon.currentChannelId }));

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

  render(
    <Provider store={store}>
      <UserNameContext.Provider value={userName}>
        <App />
      </UserNameContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
