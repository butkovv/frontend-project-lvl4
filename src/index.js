import 'core-js/stable';
import 'regenerator-runtime/runtime';
import gon from 'gon';
import io from 'socket.io-client';
import '../assets/application.scss';
import app from './app.jsx';
import './lib/i18n.js';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
const connection = io();

app(gon, connection);
