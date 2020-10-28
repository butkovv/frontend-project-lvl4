import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import faker from 'faker';
import App from './components/App.jsx';
import '../assets/application.scss';
import reducers, { actions } from './slices';
import UserNameContext from './context.jsx';

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

  connection.on('newMessage', (msg) => {
    store.dispatch(actions.addMessageSuccess(msg.data.attributes));
  });
  connection.on('newChannel', (channel) => {
    store.dispatch(actions.createChannelSuccess(channel.data.attributes));
  });
  connection.on('removeChannel', (response) => {
    store.dispatch(actions.removeChannelSuccess(response.data));
  });
  connection.on('renameChannel', (response) => {
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
