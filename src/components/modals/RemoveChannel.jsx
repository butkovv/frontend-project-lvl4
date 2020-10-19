import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import axios from 'axios';
import { actions } from '../../slices';
import routes from '../../routes.js';

const mapStateToProps = (state) => {
  const { modal } = state;
  const { show, extra } = modal;
  return { show, channelId: extra.channelId };
};

const actionCreators = {
  showModal: actions.showModal,
  setModalType: actions.setModalType,
  setModalExtra: actions.setModalExtra,
};

const RemoveChannelModal = ({
  show, channelId, showModal, setModalExtra,
}) => {
  const handleClose = () => showModal({ show: false });
  const submitRemoval = () => {
    axios.delete(routes.channelPath(channelId))
      .then((response) => {
        console.log(response);
        // setModalType(null);
        setModalExtra({ channelId: null });
        showModal(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Remove channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to remove channel?</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={submitRemoval}>
            Remove
          </Button>
          <Button variant="outline-secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default connect(mapStateToProps, actionCreators)(RemoveChannelModal);
