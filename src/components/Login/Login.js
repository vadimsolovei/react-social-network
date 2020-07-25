import React from 'react';
import { reduxForm } from 'redux-form';
import { required } from '../../utils/validators';
import { createField, createLabel, Input } from '../FormControls/FormControls';
import { connect } from 'react-redux';
import { login } from '../../redux/authReducer';
import { Redirect } from 'react-router-dom';
import styles from './../FormControls/FormControls.module.css';

const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField(null, 'email', 'Email', Input, [required])}
      {createField(null, 'password', 'Password', Input, [required], {
        type: 'password',
      })}
      {createField('rememberMe', 'rememberMe', null, Input, null, {
        type: 'checkbox',
      })}
      {createLabel('rememberMe', 'Remember me')}
      {captchaUrl && <img src={captchaUrl} alt="captcha" /> &&
        createField('captcha', 'captcha', null, Input, [required])}
      {error && <div className={styles.formControlsError}>{error}</div>}
      <button>Submit</button>
    </form>
  );
};

const LoginReduxForm = reduxForm({
  form: 'login',
})(LoginForm);

const Login = (props) => {
  const onSubmit = (formData) => {
    props.login(
      formData.email,
      formData.password,
      formData.rememberMe,
      formData.captcha
    );
  };

  if (props.isAuth) {
    return <Redirect to={'/profile'} />;
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
  );
};

let mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl,
  };
};

export default connect(mapStateToProps, { login })(Login);
