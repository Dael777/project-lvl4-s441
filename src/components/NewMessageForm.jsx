import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../actions';

const mapStateToProps = state => state;

const actionCreators = {
  addMessage: actions.addMessage,
};

const NewMessageForm = (props) => {
  const addMessageHandle = async (e) => {
    const { addMessage, reset } = props;
    try {
      await addMessage(e);
    } catch (error) {
      throw error;
    }
    reset();
  };

  const { handleSubmit } = props;
  return (
    <form className="form-inline" onSubmit={handleSubmit(addMessageHandle)}>
      <Field name="text" className="form" required component="input" type="text" />
      <input type="submit" className="btn btn-primary btn-sm" value="Send" />
    </form>
  );
};

const connectedForm = connect(mapStateToProps, actionCreators)(NewMessageForm);
export default reduxForm({
  form: 'newMessage',
})(connectedForm);
