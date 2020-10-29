import React from 'react';
import { Formik } from 'formik';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { actions, asyncActions } from '../../slices';

const mapStateToProps = (state) => {
  const { modal } = state;
  const { show, extra } = modal;
  return { show, id: extra.channelId };
};

const actionCreators = {
  toggleModal: actions.toggleModal,
  removeChannel: asyncActions.removeChannel,
};

const RemoveChannelModal = ({
  show, id, toggleModal, removeChannel,
}) => {
  const { t } = useTranslation();

  const handleClose = () => toggleModal({ show: false });

  const submitRemoval = async (values, { setSubmitting, setErrors }) => {
    try {
      await removeChannel({ id });
      setSubmitting(false);
      toggleModal({ show: false });
    } catch (e) {
      setErrors({ error: t('errors.networkError') });
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('modals.removeChannel.header')}</Modal.Title>
        </Modal.Header>
        <Formik
          onSubmit={submitRemoval}
          initialValues={{
            name: '',
          }}
        >
          {({ isSubmitting, errors, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Modal.Body>
                {t('modals.removeChannel.body')}
                <h6 className="text-danger">
                  {errors.error}
                </h6>
              </Modal.Body>
              <Modal.Footer>
                <Button type="submit" variant="outline-danger" disabled={isSubmitting}>
                  {t('modals.removeChannel.confirm')}
                </Button>
                <Button variant="outline-secondary" onClick={handleClose}>
                  {t('modals.removeChannel.cancel')}
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};
export default connect(mapStateToProps, actionCreators)(RemoveChannelModal);
