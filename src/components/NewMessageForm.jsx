import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import axios from 'axios';
import cn from 'classnames';
import UserNameContext from '..';
import { newMessageRoute } from '../../routes.js';

const mapStateToProps = (state) => {
  const props = {
    currentChannelId: state.channels.currentChannelId,
  };
  return props;
};

@reduxForm({ form: 'newMessage' })
@connect(mapStateToProps)
class NewMessageForm extends React.Component {
  createMessage = userName => async ({ text }) => {
    const { currentChannelId, reset } = this.props;
    try {
      await axios.post(newMessageRoute(currentChannelId), {
        data: {
          attributes: {
            message: text,
            author: userName,
          },
        },
      });
    } catch (error) {
      throw error;
    }
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
