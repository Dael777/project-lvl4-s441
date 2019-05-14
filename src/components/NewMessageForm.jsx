import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actions from '../actions';

const mapStateToProps = state => state;

const actionCreators = {
  addMessage: actions.addMessage,
};

const NewMessageForm = (props) => {
  const createMessage = async ({ text }) => {
    const { reset } = props;
    try {
      const response = await axios.post('/api/v1/channels/1/messages', {
        data: {
          attributes: {
            messages: text,
          },
        },
      });
      // console.log(response.data);
    } catch (error) {
      throw error;
    }
    reset();
  };

  const { handleSubmit } = props;
  return (
    <form className="form-inline" onSubmit={handleSubmit(createMessage)}>
      <Field name="text" className="form" required component="input" type="text" />
      <input type="submit" className="btn btn-primary btn-sm" value="Send" />
    </form>
  );
};

const connectedForm = connect(mapStateToProps, actionCreators)(NewMessageForm);
export default reduxForm({
  form: 'newMessage',
})(connectedForm);
