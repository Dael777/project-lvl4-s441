import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {
  Container, Col, Row, Button, Modal,
} from 'react-bootstrap';
import * as actions from '../../actions';

const mapStateToProps = (state) => {
  const props = {
    status: state.modals.status,
    info: state.modals.info,
  };
  return props;
};

const actionCreators = {
  renameChannelHandle: actions.renameChannelHandle,
};

@reduxForm({ form: 'renameChannel' })
@connect(mapStateToProps, actionCreators)
class RenameChannelModal extends React.Component {
  componentWillMount = () => {
    const { initialize, info } = this.props;
    initialize({ newName: info.name });
  }

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
