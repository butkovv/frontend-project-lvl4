import React from 'react';
import Rollbar from 'rollbar';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import MessageBox from './MessageBox.jsx';

const App = () => {
  React.useState({
    rollbar: new Rollbar({
      accessToken: '2fb1743bfd9645ef9fb59b0c29e54db3',
      captureUncaught: true,
      captureUnhandledRejections: true,
    }),
  });

  return (
    <div className="row h-100 pb-3">
      <Channels />
      <div className="col h-100">
        <div className="d-flex flex-column h-100">
          <Messages />
          <MessageBox />
        </div>
      </div>
    </div>
  );
};
export default App;
