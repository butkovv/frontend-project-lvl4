import React from 'react';
import { Formik } from 'formik';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next';
import { actions, asyncActions } from '../../slices';

const RemoveChannelModal = () => {
  const { show } = useSelector((state) => state.modal);
  const id = useSelector((state) => state.modal.extra.channelId);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleClose = () => dispatch(actions.toggleModal({ show: false }));

  const submitRemoval = async (values, { setSubmitting, setErrors }) => {
    try {
      unwrapResult(await dispatch(asyncActions.removeChannel({ id })));
      setSubmitting(false);
      dispatch(actions.toggleModal({ show: false }));
    } catch (error) {
      setErrors({ error: error.message });
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
                {errors.error && (
                <Alert variant="danger">
                  {errors.error}
                </Alert>
                )}
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
export default RemoveChannelModal;
