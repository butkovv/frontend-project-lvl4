import React, { useRef, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { actions, asyncActions } from '../../slices';

const mapStateToProps = (state) => {
  const { modal: { show } } = state;
  return { show };
};

const actionCreators = {
  showModal: actions.showModal,
  createChannel: asyncActions.createChannel,
};

const NewChannelModal = ({
  show, showModal, createChannel,
}) => {
  const { t } = useTranslation();

  const handleClose = () => showModal({ show: false });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });

  const submitNewChannel = async (value, { setSubmitting }) => {
    const name = value.channelName;
    try {
      await createChannel({ name });
      setSubmitting(false);
      showModal({ show: false });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('modals.addChannel.header')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            onSubmit={submitNewChannel}
            initialValues={{
              channelName: '',
            }}
          >
            {({
              handleSubmit,
              handleChange,
              values,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>{t('modals.addChannel.body')}</Form.Label>
                  <Form.Control
                    type="text"
                    name="channelName"
                    value={values.channelName}
                    onChange={handleChange}
                    ref={inputRef}
                  />
                </Form.Group>
                <Button type="submit" variant="outline-success">
                  {t('modals.addChannel.confirm')}
                </Button>
                <Button variant="outline-secondary" onClick={handleClose}>
                  {t('modals.addChannel.cancel')}
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer />
      </Modal>
    </>
  );
};
export default connect(mapStateToProps, actionCreators)(NewChannelModal);
