import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  Container, Col, Row, Button, Modal,
} from 'react-bootstrap';
import connect from '../../connect';

const mapStateToProps = (state) => {
  const props = {
    status: state.modals.status,
    info: state.modals.info,
    initialValues: { newName: state.modals.info.name },
  };
  return props;
};

@connect(mapStateToProps)
@reduxForm({ form: 'renameChannel', enableReinitialize: true })
class RenameChannelModal extends React.Component {
  renameChannelHandle = id => ({ newName }) => {
    const { renameChannelHandle } = this.props;
    renameChannelHandle(id, newName);
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
                <Field name="newName" className="form w-100" required component="input" type="text" />
              </Modal.Body>
            </Col>
            <Col xs={12}>
              <Modal.Footer>
                <Button variant="secondary" onClick={close}>Cancel</Button>
                <Button variant="primary" type="submit">Rename</Button>
              </Modal.Footer>
            </Col>
          </Row>
        </Container>
      </form>
    );
  }
}

export default RenameChannelModal;
