import React from 'react';
import { connect } from 'react-redux';
import {
  Row, Col, Container, ListGroup,
} from 'react-bootstrap';
import { channelsSelector } from '../selectors';
import Channels from './Channels';
import Messages from './Messages';
import NewChannel from './NewChannel';
import NewMessageForm from './NewMessageForm';
import ModalWindow from './ModalWindow';

const mapStateToProps = (state) => {
  const props = {
    channels: channelsSelector(state),
    currentChannelId: state.channels.currentChannelId,
  };
  return props;
};

@connect(mapStateToProps)
class App extends React.Component {
  render() {
    return (
      <>
        <Container className="vh-100">
          <Row>
            <Col xs={4} className="bg-dark">
              <ListGroup as="ul" className="mt-3">
                <Channels />
                <NewChannel />
              </ListGroup>
            </Col>
            <Col xs={8} className="d-flex flex-column vh-100 bg-light">
              <Messages />
              <NewMessageForm />
            </Col>
          </Row>
        </Container>
        <ModalWindow />
      </>
    );
  }
}

export default App;
