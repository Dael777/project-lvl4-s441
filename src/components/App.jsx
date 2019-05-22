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
      <Container>
        <Row>
          <Col xs={4}>
            <ListGroup as="ul">
              <Channels />
              <NewChannel />
            </ListGroup>
          </Col>
          <Col xs={8}>
            <Messages />
            <NewMessageForm />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
