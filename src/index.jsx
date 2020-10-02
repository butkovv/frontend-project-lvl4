import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { render } from 'react-dom';
import gon from 'gon';
import App from './components/App.jsx';
import '../assets/application.scss';

// import faker from 'faker';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

console.log('it works!');
console.log('gon', gon);
const { channels, messages, currentChannelId } = gon;
render(
  <App channels={channels} messages={messages} currentChannelId={currentChannelId} />,
  document.getElementById('chat'),
);
