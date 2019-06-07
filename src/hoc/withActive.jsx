import React from 'react';

export default () => Component => class Active extends React.Component {
  state = { active: 1 };

  componentDidUpdate = () => {
    const { channels } = this.props;
    const { active } = this.state;
    const activeChannel = channels.filter(channel => channel.id === active);
    if (activeChannel.length === 0) {
      this.setState({ active: 1 });
    }
  }

  handleSetActive = active => () => {
    this.setState({ active });
  };

  render() {
    const { active } = this.state;
    return (
      <Component
        {...this.props}
        active={active}
        setActive={this.handleSetActive}
      />
    );
  }
};
