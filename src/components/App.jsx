import React from 'react';
import Channels from './Channels.jsx';

const App = ({ channels }) => (
  <div className="col-5">
    <Channels channels={channels} />
  </div>
);
export default App;
