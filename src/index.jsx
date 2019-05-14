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
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
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
if (registeredUsername === undefined) {
  const randomName = faker.name.findName();
  cookies.set('name', randomName);
}

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducers,
  {
    channels: { byId: initialChannels, allIds: initialAllids, currentChannelId },
    messages: { byId: initialMessages, allIds: initialMessagesIds },
  },
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);
/* eslint-enable */

const socket = io('/', { forceNew: false });

socket.on('newMessage', ({ data: { attributes } }) => {
  store.dispatch(actions.addMessage({ attributes }));
});

const container = document.querySelector('#chat');
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  container,
);
