import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const {
    channels: { byId, allIds },
  } = state;
  const channels = allIds.map((id) => byId[id]);
  return { channels };
};

const Channels = ({ channels }) => (
  <div className="col-3 border-right">
    <div className="d-flex mb-2">
      <span>Channels</span>
    </div>
    <ul className="nav flex-column nav-pills nav-fill">
      {channels && channels.map(({ id, name }) => (
        <li key={id} className="nav-item">
          <button type="button" className="nav-link btn-block mb-2 text-left btn btn-light">
            {name}
          </button>
        </li>
      ))}
    </ul>
  </div>
);
export default connect(mapStateToProps, null)(Channels);
