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
  const { show } = modal;
  return { show };
};

const actionCreators = {
  showModal: actions.showModal,
};

const NewChannelModal = ({ show, showModal }) => {
  const handleClose = () => showModal({ show: false });
  const submitNewChannel = (value, { setSubmitting }) => {
    const channelData = {
      data: {
        attributes: { name: value.channelName },
      },
    };
    console.log(channelData);
    axios.post(routes.channelsPath(), channelData)
      .then((response) => {
        console.log(response);
        setSubmitting(false);
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
          <Modal.Title>Create new channel</Modal.Title>
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
                  <Form.Label>Enter channel name</Form.Label>
                  <Form.Control
                    type="text"
                    name="channelName"
                    value={values.channelName}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Button type="submit" variant="outline-success">
                  Create channel
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
export default connect(mapStateToProps, actionCreators)(NewChannelModal);
