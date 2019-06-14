import React from 'react';
import { reduxForm } from 'redux-form';
import { withTranslation } from 'react-i18next';
import {
  Container, Col, Row, Button, Modal,
} from 'react-bootstrap';
import connect from '../../connect';

const mapStateToProps = (state) => {
  const props = {
    status: state.modals.status,
    info: state.modals.info,
    currentChannelId: state.channels.currentChannelId,
    channelDeletionState: state.channelDeletionState,
  };
  return props;
};

@connect(mapStateToProps)
@reduxForm({ form: 'deleteChannel' })
@withTranslation()
class DeleteChannelModal extends React.Component {
  removeChannel = id => () => {
    const { currentChannelId, removeChannel } = this.props;
    removeChannel(id, currentChannelId);
  }

  render() {
    const {
      handleSubmit,
      close,
      info,
      channelDeletionState,
      t,
    } = this.props;

    return (
      <form className="form-inline" onSubmit={handleSubmit(this.removeChannel(info.id))}>
        <Container>
          <Row>
            <Col xs={12}>
              <Modal.Header closeButton>
                <Modal.Title>Delete this channel?</Modal.Title>
              </Modal.Header>
            </Col>
            <Col xs={12}>
              <Modal.Body>
                <div>Are you really want to delete this channel?</div>
                <div className="text-danger">{ channelDeletionState === 'failed' && t('channelDeletionFail') }</div>
              </Modal.Body>
            </Col>
            <Col xs={12}>
              <Modal.Footer>
                <Button variant="secondary" onClick={close}>Cancel</Button>
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
