import React from 'react';
import Channels from './Channels';

const App = (channels) => {
  return (
    <div>
      <ul className="list-group">
        <Channels channelsList={channels} />
      </ul>
    </div>
  );
};

export default App;
