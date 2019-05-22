import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {
  Container, Col, Row, Button, Modal,
} from 'react-bootstrap';
import axios from 'axios';
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
    });
  };

  handleClose = () => {
    const { handleModal } = this.props;
    handleModal({
      status: false,
    });
  };

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
    const { status, handleSubmit } = this.props;
    return (
      <>
        <Button variant="outline-info" className="mt-4" onClick={this.handleOpen}>Add new channel</Button>
        <Modal show={status} onHide={this.handleClose}>
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
                    <Button variant="secondary" onClick={this.handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" type="submit">Send</Button>
                  </Modal.Footer>
                </Col>
              </Row>
            </Container>
          </form>
        </Modal>
      </>
    );
  }
}

export default NewChannel;
