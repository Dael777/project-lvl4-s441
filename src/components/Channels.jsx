import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { channelsSelector } from '../selectors';

const mapStateToProps = (state) => {
  const props = {
    channels: channelsSelector(state),
    currentChannelId: state.channels.currentChannelId,
  };
  return props;
};

const actionCreators = {
  changeChannel: actions.changeChannel,
};

@connect(mapStateToProps, actionCreators)
class Channels extends React.Component {
  changeChannelHandle = channelId => () => {
    const { changeChannel } = this.props;
    changeChannel({ channelId });
  }

  render() {
    const { channels, currentChannelId } = this.props;
    return channels.map(channel => (
      <ListGroup.Item as="li" key={channel.id} active={channel.id === currentChannelId} onClick={this.changeChannelHandle(channel.id)}>
        {channel.name}
      </ListGroup.Item>
    ));
  }
}

export default Channels;
