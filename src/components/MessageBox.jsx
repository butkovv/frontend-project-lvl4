import React from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';

const Basic = () => (
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
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
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

export default Basic;
