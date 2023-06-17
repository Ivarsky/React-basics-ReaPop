/* eslint-disable no-undef */
/* eslint-disable no-debugger */
export const getIsLogged = (state) => state.auth;

export const getAdverts = (state) =>
  state.adverts.areLoaded ? state.adverts.data : [];

//TODO: borra esto
//export const getAdvert = (state, advertId) =>
//  getAdverts(state).find(advert => advert.id === advertId);

export const getAdvert = (advertId) => (state) =>
  state.adverts.data.find((advert) => advert.id === advertId);

export const getUi = (state) => state.ui;

export const areAdvertsLoaded = (state) => state.adverts.areLoaded;
