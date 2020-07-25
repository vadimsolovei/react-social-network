import { authApi, securityApi } from '../api/api';
import { stopSubmit } from 'redux-form';

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';

let initialState = {
  userId: null,
  email: null,
  login: null,
  password: null,
  isAuth: false,
  captchaUrl: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
    case GET_CAPTCHA_URL_SUCCESS:
      return {
        ...state,
        ...action.data,
      };

    default:
      return state;
  }
};

const setAuthUserData = (userId, email, login, isAuth) => {
  return { type: SET_USER_DATA, data: { userId, email, login, isAuth } };
};

const getCaptchaUrlSuccess = (captchaUrl) => {
  return { type: GET_CAPTCHA_URL_SUCCESS, data: { captchaUrl } };
};

export const getAuthUserData = () => async (dispatch) => {
  let data = await authApi.me();
  if (data.resultCode === 0) {
    let { id, email, login } = data.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
};

export const login = (email, password, rememberMe, captcha) => async (
  dispatch
) => {
  let data = await authApi.login(email, password, rememberMe, captcha);
  if (data.resultCode === 0) {
    dispatch(getAuthUserData());
  } else {
    if (data.resultCode === 10) {
      dispatch(getCaptchaUrl());
    }
    let message = data.messages.length > 0 ? data.messages[0] : '';
    dispatch(stopSubmit('login', { _error: message }));
  }
};

export const logout = () => async (dispatch) => {
  let data = await authApi.logout();
  if (data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};

export const getCaptchaUrl = () => async (dispatch) => {
  let captchaUrl = await securityApi.getCaptchaUrl();
  dispatch(getCaptchaUrlSuccess(captchaUrl));
};

export default authReducer;
