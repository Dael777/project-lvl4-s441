import React from 'react';
import { reduxForm } from 'redux-form';
import { Button } from 'react-bootstrap';
import connect from '../connect';

const mapStateToProps = state => state.modals;

@reduxForm({ form: 'newChannel' })
@connect(mapStateToProps)
class NewChannel extends React.Component {
  handleOpen = () => {
    const { handleModal } = this.props;
    handleModal({
      status: true,
      info: {
        type: 'addChannel',
      },
    });
  };

  render() {
    return (
      <>
        <Button variant="success" className="mt-4" onClick={this.handleOpen}>Add new channel</Button>
      </>
    );
  }
}

export default NewChannel;
