import React from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import axios from 'axios';
import _ from 'lodash';
import routes from '../routes.js';
import UserNameContext from '../context.jsx';

const MessageBox = () => {
  const nickname = React.useContext(UserNameContext);
  return (
    <div className="mt-auto">
      <Formik
        initialValues={{ message: '' }}
        validate={(values) => {
          const errors = {};
          if (!values.message) {
            errors.message = 'Required';
          }
          return errors;
        }}
        onSubmit={(value, { setSubmitting, resetForm }) => {
          const messageData = {
            data: {
              attributes: {
                body: value.message, id: _.uniqueId(), channelId: 1, nickname,
              },
            },
          };
          axios.post(routes.channelMessagesPath(1), messageData)
            .then((response) => {
              console.log(response);
              setSubmitting(false);
              resetForm();
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="message" />
            <ErrorMessage name="message" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default MessageBox;
