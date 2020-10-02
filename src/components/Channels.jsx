import React from 'react';

const Channels = ({ channels }) => (
  <div className="col-5">
    <span>Channels</span>
    <ul className="list-group">
      {channels.map(({ id, name }) => (
        <li key={id} className="list-group-item d-flex">
          <span className="mr-auto">{name}</span>
        </li>
      ))}
    </ul>
  </div>
);
export default Channels;
