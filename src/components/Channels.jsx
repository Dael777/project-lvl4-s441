import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FaPen, FaRegTimesCircle } from 'react-icons/fa';
import axios from 'axios';
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

  removeChannelHandle = id => async () => {
    try {
      await axios.delete(`/api/v1/channels/${id}`);
    } catch (error) {
      throw error;
    }
  }

  render() {
    const { channels, currentChannelId } = this.props;
    return channels.map(channel => (
      <ListGroup.Item as="li" key={channel.id} active={channel.id === currentChannelId} onClick={this.changeChannelHandle(channel.id)}>
        <div className="d-flex align-items-center justify-content-between">
          <div>{channel.name}</div>
          <div>
            <FaPen className="ml-1 mr-1" />
            { channel.removable && <FaRegTimesCircle className="ml-1 mr-1" onClick={this.removeChannelHandle(channel.id)} /> }
          </div>
        </div>
      </ListGroup.Item>
    ));
  }
}

export default Channels;
