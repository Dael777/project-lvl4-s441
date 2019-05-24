import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {
  Container, Col, Row, Button, Modal,
} from 'react-bootstrap';
import axios from 'axios';

const mapStateToProps = (state) => {
  const props = {
    status: state.modals.status,
    info: state.modals.info,
  };
  return props;
};

@reduxForm({ form: 'renameChannel' })
@connect(mapStateToProps)
class RenameChannelModal extends React.Component {
  renameChannelHandle = id => async ({ text }) => {
    try {
      await axios.patch(`/api/v1/channels/${id}`, {
        data: {
          attributes: {
            name: text,
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  render() {
    const { handleSubmit, close, info } = this.props;
    return (
      <form className="form-inline" onSubmit={handleSubmit(this.renameChannelHandle(info.id))}>
        <Container>
          <Row>
            <Col xs={12}>
              <Modal.Header closeButton>
                <Modal.Title>Rename this channel</Modal.Title>
              </Modal.Header>
            </Col>
            <Col xs={12}>
              <Modal.Body>
                <Field name="text" className="form w-100" required component="input" type="text" placeholder="enter the name" />
              </Modal.Body>
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

export default RenameChannelModal;
