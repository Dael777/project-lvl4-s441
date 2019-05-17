import { createSelector } from 'reselect';

const getChannelsById = state => state.channels.byId;
const getChannelsIds = state => state.channels.allIds;
const getCurrentChannelId = state => state.channels.currentChannelId;
const getMessagesById = state => state.messages.byId;
const getMessagesIds = state => state.messages.allIds;

export const channelsSelector = createSelector(
  [getChannelsById, getChannelsIds],
  (byId, allIds) => allIds.map(id => byId[id]),
);

export const messagesSelector = createSelector(
  [getMessagesById, getMessagesIds],
  (byId, allIds) => allIds.map(id => byId[id]),
);

export const channelMessagesSelector = createSelector(
  [messagesSelector, getCurrentChannelId],
  (messages, currentChannelId) => messages.filter(
    message => message.channelId === currentChannelId,
  ),
);
