import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import axios from 'axios';
import UserNameContext from '..';

const mapStateToProps = state => state;

const NewMessageForm = (props) => {
  const createMessage = userName => async ({ text }) => {
    const { reset } = props;
    try {
      await axios.post('/api/v1/channels/1/messages', {
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

  const { handleSubmit } = props;
  return (
    <UserNameContext.Consumer>
      { ({ userName }) => (
        <form className="form-inline" onSubmit={handleSubmit(createMessage(userName))}>
          <Field name="text" className="form" required component="input" type="text" />
          <input type="submit" className="btn btn-primary btn-sm" value="Send" />
        </form>
      )}
    </UserNameContext.Consumer>
  );
};

const connectedForm = connect(mapStateToProps)(NewMessageForm);
export default reduxForm({
  form: 'newMessage',
})(connectedForm);
