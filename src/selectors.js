export const getCurrentChannelId = (state) => state.channels.currentChannelId;
export const getChannels = (state) => state.channels.items;
export const getModalType = (state) => state.modal.type;
export const getMessages = (state) => state.messages
  .filter(({ channelId }) => channelId === state.channels.currentChannelId);
export const getShowModal = (state) => state.modal.show;
export const getChannelId = (state) => state.modal.extra.channelId;
export const getChannelName = (state) => {
  const channel = state.channels.items.find((ch) => ch.id === state.modal.extra.channelId);
  return channel.name;
};
