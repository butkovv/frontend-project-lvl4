import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import gon from 'gon';
import Cookies from 'js-cookie';
import faker from 'faker';
import io from 'socket.io-client';
import reducers from './reducers/index.js';
import App from './components/App.jsx';
import '../assets/application.scss';
import {
  getChannels, getMessages, addMessage, createChannel, removeChannel, renameChannel,
} from './actions/index.js';
import UserNameContext from './context.jsx';

/* eslint-disable no-underscore-dangle */
const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext && ext();
/* eslint-enable */

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
if (!Cookies.get('name')) {
  Cookies.set('name', faker.internet.userName());
}
const userName = Cookies.get('name');
console.log('it works!');
console.log('gon', gon);

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    devtoolMiddleware,
  ),
);

const socket = io();
socket.on('newMessage', (msg) => {
  store.dispatch(addMessage(msg.data.attributes));
});
socket.on('newChannel', (channel) => {
  store.dispatch(createChannel(channel.data.attributes));
});
socket.on('removeChannel', (response) => {
  store.dispatch(removeChannel(response.data));
});
socket.on('renameChannel', (response) => {
  store.dispatch(renameChannel(response.data.attributes));
});
store.dispatch(getChannels({ channels: gon.channels }));
store.dispatch(getMessages({ messages: gon.messages }));

render(
  <Provider store={store}>
    <UserNameContext.Provider value={userName}>
      <App />
    </UserNameContext.Provider>
  </Provider>,
  document.getElementById('chat'),
);
