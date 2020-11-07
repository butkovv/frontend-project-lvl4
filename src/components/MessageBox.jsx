import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useTranslation } from 'react-i18next';
import UserNameContext from '../context.js';
import { asyncActions } from '../slices';

const MessageBox = () => {
  const { currentChannelId } = useSelector((state) => state.channels);
  const dispatch = useDispatch();
  const nickname = useContext(UserNameContext);
  const { t } = useTranslation();
  const { addMessage } = asyncActions;

  const submitMessage = async (value, { setSubmitting, resetForm, setErrors }) => {
    const data = {
      message: value.message,
      channelId: currentChannelId,
      nickname,
    };
    try {
      const result = await dispatch(addMessage(data));
      unwrapResult(result);
      resetForm();
      setSubmitting(false);
    } catch (error) {
      setErrors({ error: error.message });
    }
  };

  const schema = Yup.object().shape({
    message: Yup.string().required(t('errors.required')),
  });

  return (
    <div className="mt-auto">
      <Formik
        onSubmit={submitMessage}
        initialValues={{ message: '' }}
        validationSchema={schema}
      >
        {({
          isSubmitting,
          handleSubmit,
          handleChange,
          values,
          errors,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            {errors.error && (
            <Alert variant="danger">
              {errors.error}
            </Alert>
            )}
            <InputGroup className="mb-3">
              <FormControl
                placeholder={t('elements.inputText')}
                type="text"
                name="message"
                value={values.message}
                onChange={handleChange}
                isInvalid={!!errors.message}
              />
              <Form.Control.Feedback tooltip type="invalid">{errors.message}</Form.Control.Feedback>
              <InputGroup.Append>
                <Button variant="primary" type="submit" disabled={isSubmitting}>{t('elements.sendButton')}</Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default MessageBox;
