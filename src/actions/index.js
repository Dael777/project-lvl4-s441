import { createAction } from 'redux-actions';

export const changeChannel = createAction('CHANNEL_CHANGE');
export const addChannel = createAction('CHANNEL_ADD');
export const addMessage = createAction('MESSAGE_ADD');
export const handleModal = createAction('MODAL_HANDLE');
