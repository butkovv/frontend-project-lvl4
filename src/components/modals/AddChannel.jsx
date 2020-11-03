import React, { useRef, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { actions, asyncActions } from '../../slices';

const mapStateToProps = (state) => {
  const { modal: { show } } = state;
  return { show };
};

const actionCreators = {
  toggleModal: actions.toggleModal,
  createChannel: asyncActions.createChannel,
};

const NewChannelModal = ({
  show, toggleModal, createChannel,
}) => {
  const { t } = useTranslation();

  const handleClose = () => toggleModal({ show: false });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });

  const submitNewChannel = async (value, { setSubmitting, setErrors }) => {
    const name = value.channelName;
    try {
      unwrapResult(await createChannel({ name }));
      setSubmitting(false);
      toggleModal({ show: false });
    } catch (error) {
      setErrors({ error: error.message });
    }
  };

  const schema = Yup.object().shape({
    channelName: Yup.string().required(t('errors.required')),
  });

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('modals.addChannel.header')}</Modal.Title>
        </Modal.Header>
        <Formik
          onSubmit={submitNewChannel}
          initialValues={{
            channelName: '',
          }}
          validationSchema={schema}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            errors,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Modal.Body>
                <Form.Group>
                  <Form.Label>{t('modals.addChannel.body')}</Form.Label>
                  <Form.Control
                    type="text"
                    name="channelName"
                    value={values.channelName}
                    onChange={handleChange}
                    ref={inputRef}
                    isInvalid={!!errors.channelName}
                  />
                  <Form.Control.Feedback type="invalid">{errors.channelName}</Form.Control.Feedback>
                </Form.Group>
                {errors.error && (
                <Alert variant="danger">
                  {errors.error}
                </Alert>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button type="submit" variant="outline-success">
                  {t('modals.addChannel.confirm')}
                </Button>
                <Button variant="outline-secondary" onClick={handleClose}>
                  {t('modals.addChannel.cancel')}
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};
export default connect(mapStateToProps, actionCreators)(NewChannelModal);
