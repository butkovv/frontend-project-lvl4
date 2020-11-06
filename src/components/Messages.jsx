import React from 'react';
import { useSelector } from 'react-redux';

const Messages = () => {
  const { currentChannelId } = useSelector((state) => state.channels);
  const messages = useSelector((state) => state.messages
    .filter(({ channelId }) => (channelId === currentChannelId)));

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
