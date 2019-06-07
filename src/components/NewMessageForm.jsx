import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import cn from 'classnames';
import UserNameContext from '../UserNameContext';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  const props = {
    currentChannelId: state.channels.currentChannelId,
  };
  return props;
};

const actionCreators = {
  createMessage: actions.createMessage,
};

@reduxForm({ form: 'newMessage' })
@connect(mapStateToProps, actionCreators)
class NewMessageForm extends React.Component {
  createMessage = userName => (text) => {
    const { createMessage, currentChannelId, reset } = this.props;
    createMessage(currentChannelId, userName, text);
    reset();
  };

  render() {
    const { handleSubmit, submitting } = this.props;
    const inputClasses = cn({
      btn: true,
      'btn-primary': true,
      'btn-sm': true,
      'w-25': true,
      disabled: submitting,
    });
    return (
      <UserNameContext.Consumer>
        { ({ userName }) => (
          <form className="form-inline mt-auto mb-3" onSubmit={handleSubmit(this.createMessage(userName))}>
            <Field name="text" className="form w-75" required component="input" type="text" />
            <input type="submit" className={inputClasses} value="Send" />
          </form>
        )}
      </UserNameContext.Consumer>
    );
  }
}

export default NewMessageForm;
