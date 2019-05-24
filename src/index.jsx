import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import faker from 'faker';
import gon from 'gon';
import cookies from 'js-cookie';
import io from 'socket.io-client';
import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as actions from './actions';
import reducers from './reducers';
import App from './components/App';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const { channels, messages, currentChannelId } = gon;
const initialAllids = channels.map(channel => channel.id);
const initialChannels = _.zipObject(initialAllids, channels);
const initialMessagesIds = messages.map(message => message.id);
const initialMessages = _.zipObject(initialMessagesIds, messages);

const registeredUsername = cookies.get('name');
const userName = !registeredUsername ? faker.name.findName() : registeredUsername;
if (registeredUsername === undefined) {
  cookies.set('name', userName);
}

const UserNameContext = React.createContext({ userName });
export default UserNameContext;

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducers,
  {
    channels: { byId: initialChannels, allIds: initialAllids, currentChannelId },
    messages: { byId: initialMessages, allIds: initialMessagesIds },
  },
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);
/* eslint-enable */

const socket = io('/', { forceNew: false });

socket.on('newMessage', ({ data: { attributes } }) => {
  const message = { ...attributes };
  store.dispatch(actions.addMessage({ message }));
});

socket.on('newChannel', ({ data: { attributes } }) => {
  const channel = { ...attributes };
  store.dispatch(actions.addChannel({ channel }));
  store.dispatch(actions.handleModal({ status: false, info: {} }));
});

socket.on('renameChannel', ({ data: { attributes } }) => {
  const channel = { ...attributes };
  store.dispatch(actions.renameChannel({ channel }));
  store.dispatch(actions.handleModal({ status: false, info: {} }));
});

socket.on('removeChannel', ({ data: { id } }) => {
  store.dispatch(actions.deleteChannel({ id }));
  store.dispatch(actions.handleModal({ status: false, info: {} }));
});

const container = document.querySelector('#chat');
ReactDOM.render(
  <Provider store={store}>
    <UserNameContext.Provider value={{ userName }}>
      <App />
    </UserNameContext.Provider>
  </Provider>,
  container,
);
