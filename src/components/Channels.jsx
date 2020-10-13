import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import * as actions from '../actions';
import NewChannelModal from './modals/Add';

const mapStateToProps = (state) => {
  const { channelsInfo } = state;
  const { channels: { byId, allIds }, currentChannelId } = channelsInfo;
  const channels = allIds.map((id) => byId[id]);
  return { channels, currentChannelId };
};

const actionCreators = {
  setCurrentChannel: actions.setCurrentChannel,
  showModal: actions.showModal,
};

const Channels = ({
  setCurrentChannel, showModal, currentChannelId, channels,
}) => {
  const handleSelectChannel = (id) => () => {
    setCurrentChannel({ id });
  };

  const handleAddChannel = () => {
    showModal({ show: true });
  };

  const renderButton = ({ id, name }) => {
    const isCurrent = id === currentChannelId;
    const classes = cn('nav-link', 'btn-block', 'mb-2', 'text-left', 'btn', { 'btn-light': !isCurrent }, { 'btn-primary': isCurrent });
    return (
      <li key={id} className="nav-item">
        <button type="button" className={classes} onClick={handleSelectChannel(id)}>
          {name}
        </button>
      </li>
    );
  };

  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>Channels</span>
        <button type="button" className="ml-auto p-0 btn btn-link" onClick={handleAddChannel}>+</button>
        <NewChannelModal />
      </div>
      <ul className="nav flex-column nav-pills nav-fill">
        {channels && channels.map(renderButton)}
      </ul>
    </div>
  );
};
export default connect(mapStateToProps, actionCreators)(Channels);
