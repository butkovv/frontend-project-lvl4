import React from 'react';
import { useSelector } from 'react-redux';

const Messages = () => {
  const { messages } = useSelector((state) => state);
  const { currentChannelId } = useSelector((state) => state.channels);

  return (
    <div id="messages-box" className="chat-messages overflow-auto mb-3">
      {messages && messages
        .filter(({ channelId }) => (channelId === currentChannelId))
        .map((message) => (
          <div key={message.id}>
            <b>{message.nickname}</b>
            <span>: </span>
            {message.body}
          </div>
        ))}
    </div>
  );
};
export default Messages;
