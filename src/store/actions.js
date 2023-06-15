import {
  ADVERTS_LOADED,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCES,
  AUTH_LOGOUT,
  UI_RESET_ERROR,
} from './types';

export const authLoginRequest = () => ({
  type: AUTH_LOGIN_REQUEST,
});

export const authLoginSucces = () => ({
  type: AUTH_LOGIN_SUCCES,
});

export const authLoginFailure = error => ({
  type: AUTH_LOGIN_FAILURE,
  error: true,
  payload: error,
});

export const authLogout = () => ({
  type: AUTH_LOGOUT,
});

export const advertsLoaded = adverts => ({
  type: ADVERTS_LOADED,
  payload: adverts,
});

export const uiResetError = () => ({
  type: UI_RESET_ERROR,
});
