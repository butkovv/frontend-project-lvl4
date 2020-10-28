import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useTranslation } from 'react-i18next';
import { actions } from '../slices';
import Modal from './modals';

const mapStateToProps = (state) => {
  const channels = state.channels.items;
  const { currentChannelId } = state.channels;
  const modalType = state.modal.type;
  return { channels, currentChannelId, modalType };
};

const actionCreators = {
  setCurrentChannel: actions.setCurrentChannel,
  showModal: actions.showModal,
};
const Channels = ({
  setCurrentChannel, showModal, currentChannelId, channels, modalType,
}) => {
  const { t } = useTranslation();

  const handleSelectChannel = (id) => () => {
    setCurrentChannel({ id });
  };

  const handleAddChannel = () => {
    showModal({ show: true, type: 'AddChannel' });
  };

  const handleRemoveChannel = (channelId) => () => {
    showModal({ show: true, type: 'RemoveChannel', channelId });
  };

  const handleRenameChannel = (channelId) => () => {
    showModal({ show: true, type: 'RenameChannel', channelId });
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
            <DropdownButton as={ButtonGroup} variant={id === currentChannelId ? 'primary' : 'light'} id="bg-nested-dropdown" title="">
              <Dropdown.Item onClick={handleRenameChannel(id)}>{t('elements.renameButton')}</Dropdown.Item>
              <Dropdown.Item onClick={handleRemoveChannel(id)}>{t('elements.removeButton')}</Dropdown.Item>
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
        <span>{t('elements.channelList')}</span>
        <button type="button" className="ml-auto p-0 btn btn-link" onClick={handleAddChannel}>+</button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill">
        {channels && channels.map(renderButton)}
      </ul>
      {modalType && <ModalWindow />}
    </div>
  );
};
export default connect(mapStateToProps, actionCreators)(Channels);
