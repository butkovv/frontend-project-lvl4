import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  const handleClose = () => showModal({ show: false });

  const submitRemoval = async () => {
    try {
      await removeChannel({ id });
      showModal({ show: false });
      setModalExtra({ channelId: null });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('modals.removeChannel.header')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t('modals.removeChannel.body')}</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={submitRemoval}>
            {t('modals.removeChannel.confirm')}
          </Button>
          <Button variant="outline-secondary" onClick={handleClose}>
            {t('modals.removeChannel.cancel')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default connect(mapStateToProps, actionCreators)(RemoveChannelModal);
