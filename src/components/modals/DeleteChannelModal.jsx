import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import {
  Container, Col, Row, Button, Modal,
} from 'react-bootstrap';
import axios from 'axios';
import * as actions from '../../actions';

const mapStateToProps = (state) => {
  const props = {
    status: state.modals.status,
    info: state.modals.info,
    currentChannelId: state.channels.currentChannelId,
  };
  return props;
};

const actionCreators = {
  changeChannel: actions.changeChannel,
};

@reduxForm({ form: 'deleteChannel' })
@connect(mapStateToProps, actionCreators)
class DeleteChannelModal extends React.Component {
  deleteChannelHandle = id => async () => {
    const { currentChannelId, changeChannel } = this.props;
    try {
      await axios.delete(`/api/v1/channels/${id}`);
      if (currentChannelId === id) {
        changeChannel({ channelId: 1 });
      }
    } catch (error) {
      throw error;
    }
  }

  render() {
    const { handleSubmit, close, info } = this.props;
    return (
      <form className="form-inline" onSubmit={handleSubmit(this.deleteChannelHandle(info.id))}>
        <Container>
          <Row>
            <Col xs={12}>
              <Modal.Header closeButton>
                <Modal.Title>Delete this channel?</Modal.Title>
              </Modal.Header>
            </Col>
            <Col xs={12}>
              <Modal.Body>Are you really want to delete this channel?</Modal.Body>
            </Col>
            <Col xs={12}>
              <Modal.Footer>
                <Button variant="secondary" onClick={close}>Close</Button>
                <Button variant="primary" type="submit">Delete</Button>
              </Modal.Footer>
            </Col>
          </Row>
        </Container>
      </form>
    );
  }
}

export default DeleteChannelModal;
