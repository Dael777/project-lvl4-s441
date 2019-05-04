import _ from 'lodash';
import React from 'react';

export default class Channels extends React.Component {
  render() {
    const { channelsList } = this.props;
    return channelsList.map(channel => <li key={_.uniqueId()} className="list-group-item">{channel.name}</li>);
  }
}
