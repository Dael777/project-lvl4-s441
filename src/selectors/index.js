import { createSelector } from 'reselect';

export const getChannelsById = state => state.channels.byId;
export const getChannelsIds = state => state.channels.allIds;
export const getMessagesById = state => state.messages.byId;
export const getMessagesIds = state => state.messages.allIds;

export const channelsSelector = createSelector(
  [getChannelsById, getChannelsIds],
  (byId, allIds) => allIds.map(id => byId[id]),
);

export const messagesSelector = createSelector(
  [getMessagesById, getMessagesIds],
  (byId, allIds) => allIds.map(id => byId[id]),
);
