import React, { useRef, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
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
  setModalType: actions.setModalType,
  setModalExtra: actions.setModalExtra,
  renameChannel: asyncActions.renameChannel,
};

const RenameChannelModal = ({
  show, id, name, showModal, setModalExtra, renameChannel,
}) => {
  const handleClose = () => showModal({ show: false });

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.select();
  }, []);

  const submitNewChannelName = async (value, { setSubmitting }) => {
    try {
      await renameChannel({ id, name });
      setSubmitting(false);
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
          <Modal.Title>Rename channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            onSubmit={submitNewChannelName}
            initialValues={{
              name,
            }}
          >
            {({
              handleSubmit,
              handleChange,
              values,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Channel name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    ref={inputRef}
                  />
                </Form.Group>
                <Button type="submit" variant="outline-warning">
                  Rename channel
                </Button>
                <Button variant="outline-secondary" onClick={handleClose}>
                  Cancel
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
export default connect(mapStateToProps, actionCreators)(RenameChannelModal);
