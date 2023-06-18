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
  async (dispatch, _getState, { service, router }) => {
    dispatch(authLoginRequest());
    try {
      await service.auth.login(loginProps);
      //Logged In
      dispatch(authLoginSucces());
      //Redirect to ultima pagina o home
      const to = router.state.location.state?.from?.pathname || "/";
      router.navigate(to);
    } catch (error) {
      dispatch(authLoginFailure(error));
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
  async (dispatch, getState, { service }) => {
    if (areAdvertsLoaded(getState())) {
      return;
    }

    dispatch(advertsLoadedRequest());
    try {
      const adverts = await service.adverts.getLatestAdverts();
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
  async (dispatch, getState, { service, router }) => {
    const isLoaded = getAdvert(advertId)(getState());
    if (isLoaded) {
      return;
    }

    dispatch(advertLoadedRequest());
    try {
      const advert = await service.adverts.getAdvert(advertId);
      dispatch(advertLoadedSuccess(advert));
    } catch (error) {
      dispatch(advertLoadedFailure(error));
      if (error.status === 404) {
        return router.navigate("/404");
      }
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
  async (dispatch, _getState, { service, router }) => {
    dispatch(advertCreateRequest());
    try {
      const { id } = await service.adverts.createAdvert(advert);
      const createdAdvert = await service.adverts.getAdvert(id);
      dispatch(advertCreateSuccess(createdAdvert));
      router.navigate(`/adverts/${id}`);
      console.log(`navigate to /adverts/${id}`);
      return createdAdvert;
    } catch (error) {
      dispatch(advertCreateFailure(error));
      if (error.status === 401) {
        router.navigate("/login");
      }
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
  async (dispatch, _getState, { service }) => {
    dispatch(advertDeleteRequest());
    try {
      await service.adverts.deleteAdvert(advertId);
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
  async (dispatch, getState, { service }) => {
    if (areTagsLoaded(getState())) {
      return;
    }
    dispatch(tagsLoadRequest());
    try {
      const tags = await service.adverts.getTags();
      dispatch(tagsLoadSuccess(tags));
    } catch (error) {
      dispatch(tagsLoadFailure(error));
      throw error;
    }
  };

export const uiResetError = () => ({
  type: UI_RESET_ERROR,
});
