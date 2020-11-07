const selectors = {
  currentChannelId: (state) => state.channels.currentChannelId,
  channels: (state) => state.channels.items,
  modalType: (state) => state.modal.type,
  messages: (state) => state.messages
    .filter(({ channelId }) => channelId === state.channels.currentChannelId),
  show: (state) => state.modal.show,
  id: (state) => state.modal.extra.channelId,
  name: (state) => {
    const channel = state.channels.items.find((ch) => ch.id === state.modal.extra.channelId);
    return channel.name;
  },
};
export default selectors;
