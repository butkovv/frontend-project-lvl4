import React, { useRef, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Formik } from 'formik';
import { actions, asyncActions } from '../../slices';

const mapStateToProps = (state) => {
  const { modal: { show, extra } } = state;
  const id = extra.channelId;
  const { name } = state.channels.items.find((ch) => ch.id === id);
  return { show, id, name };
};

const actionCreators = {
  toggleModal: actions.toggleModal,
  renameChannel: asyncActions.renameChannel,
};

const RenameChannelModal = ({
  show, id, name, toggleModal, renameChannel,
}) => {
  const { t } = useTranslation();
  const handleClose = () => toggleModal({ show: false });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  });

  const submitNewChannelName = async (values, { setSubmitting, setErrors }) => {
    renameChannel({ id, name: values.name })
      .then(unwrapResult)
      .then(() => {
        setSubmitting(false);
        toggleModal({ show: false });
      })
      .catch((error) => setErrors({ error: error.message }));
  };

  const schema = Yup.object().shape({
    name: Yup.string().required(t('errors.required')),
  });

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('modals.renameChannel.header')}</Modal.Title>
        </Modal.Header>
        <Formik
          onSubmit={submitNewChannelName}
          initialValues={{ name }}
          validationSchema={schema}
        >
          {({
            isSubmitting,
            handleSubmit,
            handleChange,
            values,
            errors,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Modal.Body>
                <Form.Group>
                  <Form.Label>{t('modals.renameChannel.body')}</Form.Label>
                  <Form.Control
                    ref={inputRef}
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>
                {errors.error && (
                <Alert variant="danger">
                  {errors.error}
                </Alert>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button type="submit" variant="outline-warning" disabled={isSubmitting}>
                  {t('modals.renameChannel.confirm')}
                </Button>
                <Button variant="outline-secondary" onClick={handleClose} disabled={isSubmitting}>
                  {t('modals.renameChannel.cancel')}
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};
export default connect(mapStateToProps, actionCreators)(RenameChannelModal);
