import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {
  Container, Col, Row, Button, Modal,
} from 'react-bootstrap';
import axios from 'axios';

const mapStateToProps = state => state.modals;

@reduxForm({ form: 'addChannel' })
@connect(mapStateToProps)
class AddChannelModal extends React.Component {
  createChannel = async ({ text }) => {
    const { reset } = this.props;
    try {
      await axios.post('/api/v1/channels', {
        data: {
          attributes: {
            name: text,
          },
        },
      });
    } catch (error) {
      throw error;
    }
    reset();
  };

  render() {
    const { handleSubmit, close } = this.props;
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
              </Modal.Body>
            </Col>
            <Col xs={12}>
              <Modal.Footer>
                <Button variant="secondary" onClick={close}>Close</Button>
                <Button variant="primary" type="submit">Send</Button>
              </Modal.Footer>
            </Col>
          </Row>
        </Container>
      </form>
    );
  }
}

export default AddChannelModal;
