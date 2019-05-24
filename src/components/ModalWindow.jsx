import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import * as actions from '../actions';
import AddChannelModal from './modals/AddChannelModal';
import DeleteChannelModal from './modals/DeleteChannelModal';

const mapStateToProps = state => state.modals;

const actionCreators = {
  handleModal: actions.handleModal,
};

@connect(mapStateToProps, actionCreators)
class ModalWindow extends React.Component {
  handleClose = () => {
    const { handleModal } = this.props;
    handleModal({
      status: false,
      info: {},
    });
  };

  render() {
    const { status, info } = this.props;
    return (
      <Modal show={status} onHide={this.handleClose}>
        { info.type === 'addChannel' && <AddChannelModal close={this.handleClose} /> }
        { info.type === 'deleteChannel' && <DeleteChannelModal close={this.handleClose} /> }
      </Modal>
    );
  }
}

export default ModalWindow;
