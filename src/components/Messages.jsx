import React from 'react';
import { connect } from 'react-redux';
import { channelMessagesSelector } from '../selectors';

const mapStateToProps = (state) => {
  const props = {
    messages: channelMessagesSelector(state),
  };
  return props;
};

@connect(mapStateToProps)
class Messages extends React.Component {
  render() {
    const { messages } = this.props;
    return (
      <div>
        {messages.map(message => (
          <div key={message.id}>
            <strong>
              {message.author}
              {': '}
            </strong>
            {message.message}
          </div>
        ))}
      </div>
    );
  }
}

export default Messages;
