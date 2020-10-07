import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import gon from 'gon';
import reducers from './reducers/index.js';
import App from './components/App.jsx';
import '../assets/application.scss';
import { fetchChannels } from './actions/index.js';

// import faker from 'faker';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';
/* eslint-disable no-underscore-dangle */
const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext && ext();
/* eslint-enable */

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

console.log('it works!');
console.log('gon', gon);

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    devtoolMiddleware,
  ),
);
store.dispatch(fetchChannels());
// const { channels, messages, currentChannelId } = gon;
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('chat'),
);
