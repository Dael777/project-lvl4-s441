import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Button } from 'react-bootstrap';
import * as actions from '../actions';

const mapStateToProps = state => state.modals;

const actionCreators = {
  handleModal: actions.handleModal,
};

@reduxForm({ form: 'newChannel' })
@connect(mapStateToProps, actionCreators)
class NewChannel extends React.Component {
  handleOpen = () => {
    const { handleModal } = this.props;
    handleModal({
      status: true,
      info: {
        type: 'addChannel',
      },
    });
  };

  render() {
    return (
      <>
        <Button variant="outline-info" className="mt-4" onClick={this.handleOpen}>Add new channel</Button>
      </>
    );
  }
}

export default NewChannel;
