import React from 'react';

const Messages = ({ messages }) => (
  <div id="messages-box" className="chat-messages overflow-auto mb-3">
    {messages && messages.map((message) => (
      <div>
        <b>{message}</b>
      </div>
    ))}
  </div>
);
export default Messages;
