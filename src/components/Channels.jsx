import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { channelsSelector } from '../selectors';

const mapStateToProps = (state) => {
  const props = {
    channels: channelsSelector(state),
    currentChannelId: state.channels.currentChannelId,
  };
  return props;
};

class Channels extends React.Component {
  render() {
    const { channels, currentChannelId } = this.props;
    return channels.map((channel) => {
      const active = currentChannelId === channel.id ? ' active' : '';
      return <li key={_.uniqueId()} className={`list-group-item${active}`}>{channel.name}</li>;
    });
  }
}

export default connect(mapStateToProps)(Channels);
