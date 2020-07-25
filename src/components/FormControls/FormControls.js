import React from 'react';
import styles from './FormControls.module.css';
import { Field } from 'redux-form';

const FormControl = ({
  input,
  meta: { touched, error },
  Element,
  ...props
}) => {
  const hasError = touched && error;
  return (
    <div className={styles.formControls + ' ' + (hasError ? styles.error : '')}>
      <Element {...input} {...props} />
      {hasError && <span>{error}</span>}
    </div>
  );
};

export const Textarea = (props) => {
  return <FormControl {...props} Element={'textarea'} />;
};

export const Input = (props) => {
  return <FormControl {...props} Element={'input'} />;
};

export const createField = (
  id,
  name,
  placeholder,
  component,
  validators,
  props = {}
) => {
  return (
    <Field
      id={id}
      name={name}
      placeholder={placeholder}
      component={component}
      validate={validators}
      {...props}
    />
  );
};

export const createLabel = (forId, text) => {
  return <label htmlFor={forId}>{text}</label>;
};
