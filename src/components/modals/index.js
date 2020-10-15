import AddChannel from './AddChannel';
import RemoveChannel from './RemoveChannel';
import RenameChannel from './RenameChannel';

const modals = {
  AddChannel,
  RemoveChannel,
  RenameChannel,
};

export default (type) => modals[type];
