import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const channels = handleActions({
  [actions.changeChannel](state, { payload: { channel } }) {
    const { byId, allIds } = state;
    return {
      byId: { ...byId },
      allIds: [...allIds, channel.id],
    };
  },
}, { byId: {}, allIds: [], currentChannelId: null });

const messages = handleActions({
  [actions.addMessage](state, { payload: { attributes } }) {
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [attributes.id]: attributes },
      allIds: [...allIds, attributes.id],
    };
  },
}, { byId: {}, allIds: [] });

export default combineReducers({
  channels,
  messages,
  form: formReducer,
});
