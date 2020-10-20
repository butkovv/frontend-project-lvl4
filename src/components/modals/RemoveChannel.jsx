import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { actions, asyncActions } from '../../slices';

const mapStateToProps = (state) => {
  const { modal } = state;
  const { show, extra } = modal;
  return { show, id: extra.channelId };
};

const actionCreators = {
  showModal: actions.showModal,
  setModalType: actions.setModalType,
  setModalExtra: actions.setModalExtra,
  removeChannel: asyncActions.removeChannel,
};

const RemoveChannelModal = ({
  show, id, showModal, setModalExtra, removeChannel,
}) => {
  const handleClose = () => showModal({ show: false });

  const submitRemoval = async () => {
    try {
      await removeChannel({ id });
      setModalExtra({ channelId: null });
      showModal({ show: false });
    } catch (e) {
      console.log(e);
    }
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
