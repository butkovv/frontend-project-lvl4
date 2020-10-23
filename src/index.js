import 'core-js/stable';
import 'regenerator-runtime/runtime';
import gon from 'gon';
import socket from './socket';
import '../assets/application.scss';
import app from './app.jsx';
import './lib/i18n.js';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

app(gon, socket);
