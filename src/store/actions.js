import { areAdvertsLoaded, areTagsLoaded, getAdvert } from "./selectors";
import {
  ADVERTS_LOADED_FAILURE,
  ADVERTS_LOADED_REQUEST,
  ADVERTS_LOADED_SUCCESS,
  ADVERT_CREATED_FAILURE,
  ADVERT_CREATED_REQUEST,
  ADVERT_CREATED_SUCCESS,
  ADVERT_DELETED_FAILURE,
  ADVERT_DELETED_REQUEST,
  ADVERT_DELETED_SUCCESS,
  ADVERT_LOADED_FAILURE,
  ADVERT_LOADED_REQUEST,
  ADVERT_LOADED_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  TAGS_LOAD_FAILURE,
  TAGS_LOAD_REQUEST,
  TAGS_LOAD_SUCCESS,
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

export const advertLoadedRequest = () => ({
  type: ADVERT_LOADED_REQUEST,
});

export const advertLoadedSuccess = (advert) => ({
  type: ADVERT_LOADED_SUCCESS,
  payload: advert,
});

export const advertLoadedFailure = (error) => ({
  type: ADVERT_LOADED_FAILURE,
  error: true,
  payload: error,
});

export const advertLoad =
  (advertId) =>
  async (dispatch, getState, { adverts: advertsService }) => {
    const isLoaded = getAdvert(advertId)(getState());
    if (isLoaded) {
      return;
    }

    dispatch(advertLoadedRequest());
    try {
      const advert = await advertsService.getAdvert(advertId);
      dispatch(advertLoadedSuccess(advert));
    } catch (error) {
      dispatch(advertLoadedFailure(error));
      throw error;
    }
  };

export const advertCreateRequest = () => ({
  type: ADVERT_CREATED_REQUEST,
});
export const advertCreateFailure = (error) => ({
  type: ADVERT_CREATED_FAILURE,
  error: error,
  payload: error,
});
export const advertCreateSuccess = (advert) => ({
  type: ADVERT_CREATED_SUCCESS,
  payload: advert,
});

export const advertCreate =
  (advert) =>
  async (dispatch, _getState, { adverts: advertsService }) => {
    dispatch(advertCreateRequest());
    try {
      const { id } = await advertsService.createAdvert(advert);
      const createdAdvert = await advertsService.getAdvert(id);
      dispatch(advertCreateSuccess(createdAdvert));
      return createdAdvert;
    } catch (error) {
      dispatch(advertCreateFailure(error));
      throw error;
    }
  };

export const advertDeleteRequest = () => ({
  type: ADVERT_DELETED_REQUEST,
});

export const advertDeleteFailure = (error) => ({
  type: ADVERT_DELETED_FAILURE,
  error: error,
  payload: error,
});

export const advertDeleteSuccess = (advertId) => ({
  type: ADVERT_DELETED_SUCCESS,
  payload: advertId,
});

export const advertDelete =
  (advertId) =>
  async (dispatch, _getState, { adverts: advertsService }) => {
    dispatch(advertDeleteRequest());
    try {
      await advertsService.deleteAdvert(advertId);
      dispatch(advertDeleteSuccess(advertId));
    } catch (error) {
      dispatch(advertDeleteFailure(error));
      console.log(error);
      throw error;
    }
  };

export const tagsLoadRequest = () => ({
  type: TAGS_LOAD_REQUEST,
});

export const tagsLoadFailure = (error) => ({
  type: TAGS_LOAD_FAILURE,
  error: error,
  payload: error,
});

export const tagsLoadSuccess = (tags) => ({
  type: TAGS_LOAD_SUCCESS,
  payload: tags,
});

export const tagsLoad =
  () =>
  async (dispatch, getState, { adverts: advertsService }) => {
    if (areTagsLoaded(getState())) {
      return;
    }
    dispatch(tagsLoadRequest());
    try {
      const tags = await advertsService.getTags();
      dispatch(tagsLoadSuccess(tags));
    } catch (error) {
      dispatch(tagsLoadFailure(error));
      throw error;
    }
  };

export const uiResetError = () => ({
  type: UI_RESET_ERROR,
});
