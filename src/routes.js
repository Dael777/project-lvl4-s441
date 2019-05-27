const path = '/api/v1/';

export const addChannelRoute = () => `${path}channels`;

export const channelRouteId = id => `${path}channels/${id}`;

export const newMessageRoute = id => `/api/v1/channels/${id}/messages`;
