import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import _ from 'lodash';
import routes from '../routes.js';
import UserNameContext from '../context.jsx';

const mapStateToProps = (state) => {
  const { channelsInfo } = state;
  const { currentChannelId } = channelsInfo;
  return { currentChannelId };
};

const MessageBox = ({ currentChannelId }) => {
  const nickname = useContext(UserNameContext);

  const submitMessage = (value, { setSubmitting, resetForm }) => {
    if (value.message.length === 0) {
      setSubmitting(false);
      resetForm();
      return;
    }
    const messageData = {
      data: {
        attributes: {
          body: value.message,
          id: _.uniqueId(),
          nickname,
        },
      },
    };
    axios.post(routes.channelMessagesPath(currentChannelId), messageData)
      .then((response) => {
        console.log(response);
        setSubmitting(false);
        resetForm();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="mt-auto">
      <Formik
        onSubmit={submitMessage}
        initialValues={{
          message: '',
        }}
      >
        {({
          handleSubmit,
          handleChange,
          values,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Message"
                type="text"
                name="message"
                value={values.message}
                onChange={handleChange}
              />
              <InputGroup.Append>
                <Button variant="primary" type="submit">Send</Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default connect(mapStateToProps, null)(MessageBox);
