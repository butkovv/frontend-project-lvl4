import React from 'react';
import { connect } from 'react-redux';
import {
  Form, Formik, Field, ErrorMessage,
} from 'formik';
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
/* eslint-disable functional/no-class */
/* eslint-disable functional/no-this-expression */
class MessageBox extends React.Component {
  render() {
    const { currentChannelId } = this.props;
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
                  body: value.message,
                  id: _.uniqueId(),
                  nickname: this.context,
                },
              },
            };
            console.log(messageData);
            axios.post(routes.channelMessagesPath(currentChannelId), messageData)
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
              <Button type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}
MessageBox.contextType = UserNameContext;
export default connect(mapStateToProps, null)(MessageBox);
