import { createAction } from 'redux-actions';
import axios from 'axios';
import { newMessageRoute, addChannelRoute, channelRouteId } from '../routes';

export const changeChannel = createAction('CHANNEL_CHANGE');

export const createMessageRequest = createAction('MESSAGE_CREATE_REQUEST');
export const createMessageFailure = createAction('MESSAGE_CREATE_FAIL');
export const addMessage = createAction('MESSAGE_ADD');
export const createMessage = (currentChannelId, userName, { text }) => async (dispatch) => {
  dispatch(createMessageRequest());
  try {
    await axios.post(newMessageRoute(currentChannelId), {
      data: {
        attributes: {
          message: text,
          author: userName,
        },
      },
    });
  } catch (error) {
    dispatch(createMessageFailure({ text }));
  }
};

export const createChannelRequest = createAction('CHANNEL_CREATE_REQUEST');
export const createChannelFailure = createAction('CHANNEL_CREATE_FAIL');
export const addChannel = createAction('CHANNEL_ADD');
export const createChannel = ({ text }) => async (dispatch) => {
  dispatch(createChannelRequest());
  try {
    await axios.post(addChannelRoute(), {
      data: {
        attributes: {
          name: text,
        },
      },
    });
  } catch (error) {
    dispatch(createChannelFailure({ text }));
  }
};

export const deleteChannelRequest = createAction('CHANNEL_DELETION_REQUEST');
export const deleteChannelFailure = createAction('CHANNEL_DELETION_FAIL');
export const deleteChannel = createAction('CHANNEL_DELETE');
export const removeChannel = (id, currentChannelId) => async (dispatch) => {
  dispatch(deleteChannelRequest());
  try {
    await axios.delete(channelRouteId(id));
    if (currentChannelId === id) {
      dispatch(changeChannel({ channelId: 1 }));
    }
  } catch (error) {
    dispatch(deleteChannelFailure({ id }));
  }
};

export const renameChannelRequest = createAction('CHANNEL_RENAME_REQUEST');
export const renameChannelFailure = createAction('CHANNEL_RENAME_FAIL');
export const renameChannel = createAction('CHANNEL_RENAME');
export const renameChannelHandle = (id, newName) => async (dispatch) => {
  dispatch(renameChannelRequest());
  try {
    await axios.patch(channelRouteId(id), {
      data: {
        attributes: {
          name: newName,
        },
      },
    });
  } catch (error) {
    dispatch(renameChannelFailure({ newName }));
  }
};

export const handleModal = createAction('MODAL_HANDLE');
