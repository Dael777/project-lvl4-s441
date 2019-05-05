import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => state;

class Channels extends React.Component {
  render() {
    const { channels } = this.props;
    return channels.map(channel => <li key={_.uniqueId()} className="list-group-item">{channel.name}</li>);
  }
}

export default connect(mapStateToProps)(Channels);
