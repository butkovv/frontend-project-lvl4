import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import * as actions from '../actions';
import Modal from './modals';

const mapStateToProps = (state) => {
  const { channelsInfo, modal } = state;
  const { channels: { byId, allIds }, currentChannelId } = channelsInfo;
  const channels = allIds.map((id) => byId[id]);
  const modalType = modal.type;
  return { channels, currentChannelId, modalType };
};

const actionCreators = {
  setCurrentChannel: actions.setCurrentChannel,
  setModalType: actions.setModalType,
  setModalExtra: actions.setModalExtra,
  showModal: actions.showModal,
};

const Channels = ({
  setCurrentChannel, setModalType, setModalExtra, showModal, currentChannelId, channels, modalType,
}) => {
  const handleSelectChannel = (id) => () => {
    setCurrentChannel({ id });
  };

  const handleAddChannel = () => {
    setModalType({ type: 'AddChannel' });
    showModal({ show: true });
  };

  const handleRemoveChannel = (channelId) => () => {
    setModalType({ type: 'RemoveChannel' });
    setModalExtra({ channelId });
    showModal({ show: true });
  };

  const handleRenameChannel = (channelId) => () => {
    setModalType({ type: 'RenameChannel' });
    setModalExtra({ channelId });
    showModal({ show: true });
  };

  const renderButton = ({ id, name, removable }) => {
    if (removable) {
      return (
        <li key={id} className="nav-item">
          <ButtonGroup className="btn-block mb-2">
            <Button
              className="btn-block text-left"
              variant={id === currentChannelId ? 'primary' : 'light'}
              onClick={handleSelectChannel(id)}
            >
              {name}
            </Button>
            <DropdownButton as={ButtonGroup} variant={id === currentChannelId ? 'primary' : 'light'} title="" id="bg-nested-dropdown">
              <Dropdown.Item eventKey="1" onClick={handleRemoveChannel(id)}>Remove</Dropdown.Item>
              <Dropdown.Item eventKey="2" onClick={handleRenameChannel(id)}>Rename</Dropdown.Item>
            </DropdownButton>
          </ButtonGroup>
        </li>
      );
    }
    return (
      <li key={id} className="nav-item">
        <Button
          className="nav-link btn-block mb-2 text-left"
          onClick={handleSelectChannel(id)}
          variant={id === currentChannelId ? 'primary' : 'light'}
        >
          {name}
        </Button>
      </li>
    );
  };
  const ModalWindow = Modal(modalType);
  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>Channels</span>
        <button type="button" className="ml-auto p-0 btn btn-link" onClick={handleAddChannel}>+</button>
        {modalType && <ModalWindow />}
      </div>
      <ul className="nav flex-column nav-pills nav-fill">
        {channels && channels.map(renderButton)}
      </ul>
    </div>
  );
};
export default connect(mapStateToProps, actionCreators)(Channels);
