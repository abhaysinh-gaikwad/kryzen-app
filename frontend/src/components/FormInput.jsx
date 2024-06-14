// src/components/FormInput.js
import React from 'react';
import { Field, ErrorMessage } from 'formik';

const FormInput = ({ label, name, type = 'text' }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <Field type={type} id={name} name={name} />
      <ErrorMessage name={name} component="div" className="error" />
    </div>
  );
};

export default FormInput;
