import React, { useRef, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { actions, asyncActions } from '../../slices';

const mapStateToProps = (state) => {
  const { modal: { show, extra } } = state;
  const id = extra.channelId;
  const { name } = state.channels.items.find((ch) => ch.id === id);
  return { show, id, name };
};

const actionCreators = {
  showModal: actions.showModal,
  renameChannel: asyncActions.renameChannel,
};

const RenameChannelModal = ({
  show, id, name, showModal, renameChannel,
}) => {
  const { t } = useTranslation();
  const handleClose = () => showModal({ show: false });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  });

  const submitNewChannelName = async (values, { setSubmitting, setErrors }) => {
    try {
      await renameChannel({ id, name: values.name });
      setSubmitting(false);
      showModal({ show: false });
    } catch (e) {
      setErrors({ error: t('errors.networkError') });
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('modals.renameChannel.header')}</Modal.Title>
        </Modal.Header>
        <Formik
          onSubmit={submitNewChannelName}
          initialValues={{
            name,
          }}
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
                  />
                </Form.Group>
                <h6 className="text-danger">
                  {errors.error}
                </h6>
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
