import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { messages, channels: { currentChannelId } } = state;
  return { messages, currentChannelId };
};

const Messages = ({ messages, currentChannelId }) => (
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
export default connect(mapStateToProps, null)(Messages);
