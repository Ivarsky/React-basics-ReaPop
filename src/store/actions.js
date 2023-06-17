import { areAdvertsLoaded } from "./selectors";
import {
  ADVERTS_LOADED_FAILURE,
  ADVERTS_LOADED_REQUEST,
  ADVERTS_LOADED_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  UI_RESET_ERROR,
} from "./types";

export const authLoginRequest = () => ({
  type: AUTH_LOGIN_REQUEST,
});

export const authLoginSucces = () => ({
  type: AUTH_LOGIN_SUCCESS,
});

export const authLoginFailure = (error) => ({
  type: AUTH_LOGIN_FAILURE,
  error: true,
  payload: error,
});

export const authLogin =
  (loginProps) =>
  async (dispatch, _getState, { auth }) => {
    dispatch(authLoginRequest());
    try {
      await auth.login(loginProps);
      //Logged In
      dispatch(authLoginSucces());
    } catch (error) {
      dispatch(authLoginFailure(error));
      throw error;
    }
  };

export const authLogout = () => ({
  type: AUTH_LOGOUT,
});

export const advertsLoadedRequest = () => ({
  type: ADVERTS_LOADED_REQUEST,
});

export const advertsLoadedSuccess = (adverts) => ({
  type: ADVERTS_LOADED_SUCCESS,
  payload: adverts,
});

export const advertsLoadedFailure = (error) => ({
  type: ADVERTS_LOADED_FAILURE,
  error: true,
  payload: error,
});

export const advertsLoaded =
  () =>
  async (dispatch, getState, { adverts: advertsService }) => {
    if (areAdvertsLoaded(getState())) {
      return;
    }

    dispatch(advertsLoadedRequest());
    try {
      const adverts = await advertsService.getLatestAdverts();
      dispatch(advertsLoadedSuccess(adverts));
    } catch (error) {
      dispatch(advertsLoadedFailure(error));
    }
  };

export const uiResetError = () => ({
  type: UI_RESET_ERROR,
});
