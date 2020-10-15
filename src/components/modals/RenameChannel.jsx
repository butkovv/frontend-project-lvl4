import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import axios from 'axios';
import * as actions from '../../actions';
import routes from '../../routes.js';

const mapStateToProps = (state) => {
  const { modal } = state;
  const { show, extra } = modal;
  return { show, channelId: extra.channelId };
};

const actionCreators = {
  showModal: actions.showModal,
  setModalType: actions.setModalType,
  setModalExtra: actions.setModalExtra,
};

const RenameChannelModal = ({
  show, channelId, showModal, setModalExtra,
}) => {
  const handleClose = () => showModal({ show: false });
  const submitNewChannelName = (value, { setSubmitting }) => {
    const payload = {
      data: {
        attributes: { name: value.newName },
      },
    };
    axios.patch(routes.channelPath(channelId), payload)
      .then((response) => {
        console.log(response);
        setSubmitting(false);
        setModalExtra({ channelId: null });
        showModal(false);
      })
      .catch((error) => {
        console.log(error);
      });
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
