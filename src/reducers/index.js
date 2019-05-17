import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const channels = handleActions({
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
}, { byId: {}, allIds: [] });

export default combineReducers({
  channels,
  messages,
  form: formReducer,
});
