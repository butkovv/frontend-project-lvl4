import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import faker from 'faker';
import Rollbar from 'rollbar';
import App from './components/App.jsx';
import '../assets/application.scss';
import reducers, { actions } from './slices';
import UserNameContext from './context.js';
import './lib/i18n.js';

// eslint-disable-next-line no-unused-vars
const rollbar = new Rollbar({
  enabled: process.env.NODE_ENV === 'production',
  accessToken: '2fb1743bfd9645ef9fb59b0c29e54db3',
  captureUncaught: true,
  captureUnhandledRejections: true,
  async: false,
});

export default (gon, connection) => {
  if (!Cookies.get('name')) {
    Cookies.set('name', faker.internet.userName());
  }
  const userName = Cookies.get('name');

  const preloadedState = {
    channels: {
      currentChannelId: gon.currentChannelId,
      items: gon.channels,
    },
    messages: gon.messages,
  };

  const store = configureStore({
    reducer: reducers,
    preloadedState,
  });

  const {
    addMessageSuccess, createChannelSuccess, removeChannelSuccess, renameChannelSuccess,
  } = actions;
  connection.on('newMessage', (msg) => {
    store.dispatch(addMessageSuccess(msg.data.attributes));
  });
  connection.on('newChannel', (channel) => {
    store.dispatch(createChannelSuccess(channel.data.attributes));
  });
  connection.on('removeChannel', (response) => {
    store.dispatch(removeChannelSuccess(response.data));
  });
  connection.on('renameChannel', (response) => {
    store.dispatch(renameChannelSuccess(response.data.attributes));
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
