import { advertsLoadedSuccess, authLoginSucces } from "../actions";
import { ADVERTS_LOADED_SUCCESS, AUTH_LOGIN_SUCCESS } from "../types";

describe("advertsLoadedSuccess", () => {
  it('should return a "ADVERTS_LOADED_SUCCESS" action', () => {
    const adverts = "adverts";
    const expectedAction = {
      type: ADVERTS_LOADED_SUCCESS,
      payload: adverts,
    };
    const action = advertsLoadedSuccess(adverts);

    expect(action).toEqual(expectedAction);
  });
});

describe("authLoginSucces", () => {
  test('should return a "AUTH_LOGIN_SUCCESS" action', () => {
    const expectedAction = {
      type: AUTH_LOGIN_SUCCESS,
    };
    expect(authLoginSucces()).toEqual(expectedAction);
  });
});
