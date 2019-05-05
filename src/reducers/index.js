import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

const channels = handleActions({}, []);

export default combineReducers({
  channels,
});
