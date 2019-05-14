import React from 'react';
import Channels from './Channels';
import Messages from './Messages';
import NewMessageForm from './NewMessageForm';

const App = () => (
  <div>
    <div className="container">
      <div className="row">
        <div className="col-4">
          <ul className="list-group">
            <Channels />
          </ul>
        </div>
        <div className="col-8">
          <Messages />
          <NewMessageForm />
        </div>
      </div>
    </div>
  </div>
);

export default App;
