import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  const { channelsInfo } = state;
  const { channels: { byId, allIds }, currentChannelId } = channelsInfo;
  const channels = allIds.map((id) => byId[id]);
  return { channels, currentChannelId };
};

const actionCreators = {
  setCurrentChannel: actions.setCurrentChannel,
};
/* eslint-disable functional/no-class */
/* eslint-disable functional/no-this-expression */
class Channels extends React.Component {
  handleSelectChannel = (id) => () => {
    const { setCurrentChannel } = this.props;
    setCurrentChannel({ id });
  }

  renderButton = ({ id, name }) => {
    const { currentChannelId } = this.props;
    const isCurrent = id === currentChannelId;
    const classes = cn('nav-link', 'btn-block', 'mb-2', 'text-left', 'btn', { 'btn-light': !isCurrent }, { 'btn-primary': isCurrent });
    return (
      <li key={id} className="nav-item">
        <button type="button" className={classes} onClick={this.handleSelectChannel(id)}>
          {name}
        </button>
      </li>
    );
  }

  render() {
    const { channels } = this.props;
    return (
      <div className="col-3 border-right">
        <div className="d-flex mb-2">
          <span>Channels</span>
        </div>
        <ul className="nav flex-column nav-pills nav-fill">
          {channels && channels.map(this.renderButton)}
        </ul>
      </div>
    );
  }
}
export default connect(mapStateToProps, actionCreators)(Channels);
