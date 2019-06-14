import React from 'react';
import { Field, reduxForm } from 'redux-form';
import cn from 'classnames';
import { withTranslation } from 'react-i18next';
import UserNameContext from '../UserNameContext';
import connect from '../connect';

const mapStateToProps = (state) => {
  const props = {
    currentChannelId: state.channels.currentChannelId,
    messageAddingState: state.messageAddingState,
  };
  return props;
};

@reduxForm({ form: 'newMessage' })
@connect(mapStateToProps)
@withTranslation()
class NewMessageForm extends React.Component {
  static contextType = UserNameContext;

  createMessage = userName => (text) => {
    const { createMessage, currentChannelId, reset } = this.props;
    createMessage(currentChannelId, userName, text);
    reset();
  };

  render() {
    const {
      handleSubmit,
      submitting,
      messageAddingState,
      t,
    } = this.props;

    const inputClasses = cn({
      btn: true,
      'btn-primary': true,
      'btn-sm': true,
      'w-25': true,
      disabled: submitting,
    });

    return (
      <>
        <div className="text-danger">{ messageAddingState === 'failed' && t('message failed') }</div>
        <form className="form-inline mt-auto mb-3" onSubmit={handleSubmit(this.createMessage(this.context))}>
          <Field name="text" className="form w-75" required component="input" type="text" />
          <input type="submit" className={inputClasses} value="Send" />
        </form>
      </>
    );
  }
}

export default NewMessageForm;
