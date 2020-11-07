import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useTranslation } from 'react-i18next';
import { actions } from '../slices';
import Modal from './modals';

const Channels = () => {
  const channels = useSelector((state) => state.channels.items);
  const { currentChannelId } = useSelector((state) => state.channels);
  const modalType = useSelector((state) => state.modal.type);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { toggleModal, setCurrentChannel } = actions;

  const handleSelectChannel = (id) => () => {
    dispatch(setCurrentChannel({ id }));
  };

  const handleAddChannel = () => {
    dispatch(toggleModal({ show: true, type: 'AddChannel' }));
  };

  const handleRemoveChannel = (channelId) => () => {
    dispatch(toggleModal({ show: true, type: 'RemoveChannel', channelId }));
  };

  const handleRenameChannel = (channelId) => () => {
    dispatch(toggleModal({ show: true, type: 'RenameChannel', channelId }));
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
        {channels.map(renderButton)}
      </ul>
      {modalType && <ModalWindow />}
    </div>
  );
};
export default Channels;
