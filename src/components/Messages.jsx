import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const {
    messagesFetchingState,
    messages: { byId, allIds },
  } = state;
  const messages = allIds.map((id) => byId[id]);
  return { messages, messagesFetchingState };
};

const Messages = ({ messages, messagesFetchingState }) => {
  if (messagesFetchingState === 'requested') {
    return (
      <div className="spinner-border m-3" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
  if (messagesFetchingState === 'failed') {
    return (
      <span>Unable to fetch messages. Please reload.</span>
    );
  }
  return (
    <div id="messages-box" className="chat-messages overflow-auto mb-3">
      {messages && messages.map((message) => (
        <div key={message.id}>
          <b>{message.nickname}</b>
          <span>: </span>
          {message.body}
        </div>
      ))}
    </div>
  );
};
export default connect(mapStateToProps, null)(Messages);
