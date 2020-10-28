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
import reducers from './slices';
import UserNameContext from './context.jsx';

export default (gon, connect) => {
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
  connect(store);

  render(
    <Provider store={store}>
      <UserNameContext.Provider value={userName}>
        <App />
      </UserNameContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
