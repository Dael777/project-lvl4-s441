import { createAction } from 'redux-actions';
import axios from 'axios';

export const changeChannel = createAction('CHANNEL_CHANGE');
export const addChannel = createAction('CHANNEL_ADD');

export const addMessageRequest = createAction('MESSAGE_ADD_REQUEST');
export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const addMessage = ({ text }) => async (dispatch) => {
  dispatch(addMessageRequest());
  try {
    const response = await axios.post('/api/v1/channels/1/messages', {
      data: {
        attributes: {
          messages: text,
        },
      },
    });
    const { data: { attributes } } = response.data;
    dispatch(addMessageSuccess({ message: attributes }));
  } catch (error) {
    dispatch(addMessageFailure());
    throw error;
  }
};
