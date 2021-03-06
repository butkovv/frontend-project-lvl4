import React from 'react';
import { useSelector } from 'react-redux';
import { getMessages } from '../selectors';

const Messages = () => {
  const messages = useSelector(getMessages);

  const renderMessage = ({ id, nickname, body }) => (
    <div key={id}>
      <b>{nickname}</b>
      <span>: </span>
      {body}
    </div>
  );

  return (
    <div id="messages-box" className="chat-messages overflow-auto mb-3">
      {messages.map(renderMessage)}
    </div>
  );
};
export default Messages;
