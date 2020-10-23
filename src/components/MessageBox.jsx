import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import routes from '../routes.js';
import UserNameContext from '../context.jsx';

const mapStateToProps = (state) => {
  const { channels: { currentChannelId } } = state;
  return { currentChannelId };
};

const MessageBox = ({ currentChannelId }) => {
  const { t } = useTranslation();

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
      .then(() => {
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
                placeholder={t('elements.inputText')}
                type="text"
                name="message"
                value={values.message}
                onChange={handleChange}
              />
              <InputGroup.Append>
                <Button variant="primary" type="submit">{t('elements.sendButton')}</Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default connect(mapStateToProps, null)(MessageBox);
