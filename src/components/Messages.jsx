import React from 'react';
import { connect } from 'react-redux';
import { messagesSelector } from '../selectors';

const mapStateToProps = (state) => {
  const props = {
    messages: messagesSelector(state),
  };
  return props;
};

const Messages = (props) => {
  const { messages } = props;
  return (
    <div>
      {messages.map(message => <div key={message.id}>{message.messages}</div>)}
    </div>
  );
};

export default connect(mapStateToProps)(Messages);
