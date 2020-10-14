import AddChannel from './AddChannel';
import RemoveChannel from './RemoveChannel';

const modals = {
  AddChannel,
  RemoveChannel,
};

export default (type) => modals[type];
