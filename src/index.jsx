import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';

// import faker from 'faker';
import gon from 'gon';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import reducers from './reducers';
import App from './components/App';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducers,
  { channels: gon.channels },
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);
/* eslint-enable */

const { channels } = gon;

const container = document.querySelector('#chat');
ReactDOM.render(
  <Provider store={store}>
    <App channels={channels} />
  </Provider>,
  container,
);
