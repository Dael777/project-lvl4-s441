import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import _ from 'lodash';
import * as actions from '../actions';

const messageAddingState = handleActions({
  [actions.createMessageRequest]() {
    return 'message creating requested';
  },
  [actions.createMessageFailure]() {
    return 'message creating failed';
  },
  [actions.addMessage]() {
    return 'message added';
  },
}, 'none');

const channelAddingState = handleActions({
  [actions.createChannelRequest]() {
    return 'channel creating requested';
  },
  [actions.createChannelFailure]() {
    return 'channel creating failed';
  },
  [actions.addChannel]() {
    return 'channel added';
  },
}, 'none');

const channelDeletionState = handleActions({
  [actions.deleteChannelRequest]() {
    return 'channel deletion requested';
  },
  [actions.deleteChannelFailure]() {
    return 'channel deletion failed';
  },
  [actions.deleteChannel]() {
    return 'channel deleted';
  },
}, 'none');

const channelRenameState = handleActions({
  [actions.renameChannelRequest]() {
    return 'channel renaming requested';
  },
  [actions.renameChannelFailure]() {
    return 'channel renaming failed';
  },
  [actions.renameChannel]() {
    return 'channel renamed';
  },
}, 'none');

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
  messageAddingState,
  channelAddingState,
  channelDeletionState,
  channelRenameState,
  modals,
  form: formReducer,
});
