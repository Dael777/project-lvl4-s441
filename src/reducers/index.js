import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import _ from 'lodash';
import * as actions from '../actions';

const channels = handleActions({
  [actions.addChannel](state, { payload: { channel } }) {
    const { byId, allIds, currentChannelId } = state;
    return {
      byId: {
        ...byId,
        [channel.id]: channel,
      },
      allIds: [...allIds, channel.id],
      currentChannelId,
    };
  },
  [actions.renameChannel](state, { payload: { channel } }) {
    const { byId, allIds, currentChannelId } = state;
    return {
      byId: {
        ...byId,
        [channel.id]: channel,
      },
      allIds: [...allIds],
      currentChannelId,
    };
  },
  [actions.deleteChannel](state, { payload: { id } }) {
    const { byId, allIds, currentChannelId } = state;
    return {
      byId: _.omit(byId, id),
      allIds: allIds.filter(channelId => channelId !== id),
      currentChannelId,
    };
  },
  [actions.changeChannel](state, { payload: { channelId } }) {
    const { byId, allIds } = state;
    return {
      byId,
      allIds,
      currentChannelId: channelId,
    };
  },
}, { byId: {}, allIds: [], currentChannelId: null });

const messages = handleActions({
  [actions.addMessage](state, { payload: { message } }) {
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [message.id]: message },
      allIds: [...allIds, message.id],
    };
  },
  [actions.deleteChannel](state, { payload: { id } }) {
    const { byId, allIds } = state;
    const deletedMessages = _.omitBy(byId, message => (message.channelId === id));
    return {
      byId: deletedMessages,
      allIds: allIds.filter(messageId => _.has(deletedMessages, messageId)),
    };
  },
}, { byId: {}, allIds: [] });

const modals = handleActions({
  [actions.handleModal](state, { payload: { status, info } }) {
    return {
      status,
      info,
    };
  },
}, { status: false, info: {} });

export default combineReducers({
  channels,
  messages,
  modals,
  form: formReducer,
});
