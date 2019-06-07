import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FaPen, FaRegTimesCircle } from 'react-icons/fa';
import * as actions from '../actions';
import { channelsSelector } from '../selectors';
import withActive from '../hoc/withActive';

const mapStateToProps = (state) => {
  const props = {
    channels: channelsSelector(state),
  };
  return props;
};

const actionCreators = {
  handleModal: actions.handleModal,
};

@connect(mapStateToProps, actionCreators)
@withActive()
class Channels extends React.Component {
  renameChannelModal = (id, name) => (e) => {
    e.stopPropagation();
    const { handleModal } = this.props;
    handleModal({
      status: true,
      info: {
        type: 'renameChannel',
        id,
        name,
      },
    });
  }

  deleteChannelModal = id => (e) => {
    e.stopPropagation();
    const { handleModal } = this.props;
    handleModal({
      status: true,
      info: {
        type: 'deleteChannel',
        id,
      },
    });
  }

  render() {
    const { channels, active, setActive } = this.props;
    return channels.map(channel => (
      <ListGroup.Item as="li" key={channel.id} active={active === channel.id} onClick={setActive(channel.id)}>
        <div className="d-flex align-items-center justify-content-between">
          <div>{channel.name}</div>
          <div>
            <FaPen className="ml-1 mr-1" onClick={this.renameChannelModal(channel.id, channel.name)} />
            { channel.removable && <FaRegTimesCircle className="ml-1 mr-1" onClick={this.deleteChannelModal(channel.id)} /> }
          </div>
        </div>
      </ListGroup.Item>
    ));
  }
}

export default Channels;
