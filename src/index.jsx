import 'core-js/stable';
import 'regenerator-runtime/runtime';
import gon from 'gon';
import '../assets/application.scss';
import app from './app.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

app(gon);
