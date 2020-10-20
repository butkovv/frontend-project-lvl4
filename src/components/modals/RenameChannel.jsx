import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { actions, asyncActions } from '../../slices';

const mapStateToProps = (state) => {
  const { modal: { show, extra } } = state;
  const id = extra.channelId;
  return { show, id };
};

const actionCreators = {
  showModal: actions.showModal,
  setModalType: actions.setModalType,
  setModalExtra: actions.setModalExtra,
  renameChannel: asyncActions.renameChannel,
};

const RenameChannelModal = ({
  show, id, showModal, setModalExtra, renameChannel,
}) => {
  const handleClose = () => showModal({ show: false });

  const submitNewChannelName = async (value, { setSubmitting }) => {
    const name = value.newName;
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
              newName: '',
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
                    name="newName"
                    value={values.newName}
                    onChange={handleChange}
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
