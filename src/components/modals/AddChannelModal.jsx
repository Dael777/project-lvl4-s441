import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { withTranslation } from 'react-i18next';
import {
  Container, Col, Row, Button, Modal,
} from 'react-bootstrap';
import connect from '../../connect';

const mapStateToProps = (state) => {
  const props = {
    channelAddingState: state.channelAddingState,
  };
  return props;
};

@connect(mapStateToProps)
@reduxForm({ form: 'addChannel' })
@withTranslation()
class AddChannelModal extends React.Component {
  createChannel = (text) => {
    const { createChannel, reset } = this.props;
    createChannel(text);
    reset();
  };

  render() {
    const {
      handleSubmit,
      close,
      channelAddingState,
      t,
    } = this.props;

    return (
      <form className="form-inline" onSubmit={handleSubmit(this.createChannel)}>
        <Container>
          <Row>
            <Col xs={12}>
              <Modal.Header closeButton>
                <Modal.Title>Add new channel</Modal.Title>
              </Modal.Header>
            </Col>
            <Col xs={12}>
              <Modal.Body>
                <Field name="text" className="form w-100" required component="input" type="text" placeholder="enter the name" />
                <div className="text-danger">{ channelAddingState === 'failed' && t('channelAddingFail') }</div>
              </Modal.Body>
            </Col>
            <Col xs={12}>
              <Modal.Footer>
                <Button variant="secondary" onClick={close}>Cancel</Button>
                <Button variant="primary" type="submit">Add</Button>
              </Modal.Footer>
            </Col>
          </Row>
        </Container>
      </form>
    );
  }
}

export default AddChannelModal;
