import {
  advertsLoadedSuccess,
  authLoginSucces,
  authLogin,
  authLoginRequest,
  authLoginFailure,
} from "../actions";
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

describe("authLogin", () => {
  const loginProps = "loginProps";
  const redirectUrl = "redirectUrl";
  const action = authLogin(loginProps);

  const dispatch = jest.fn();
  const service = { auth: {} };
  const router = {
    navigate: jest.fn(),
    state: { location: { state: { from: { pathname: redirectUrl } } } },
  };

  test("when login api resolves should follow the login flow", async () => {
    //service.auth.login=jest.fn().mockImplementation(() => Promise.resolve());
    service.auth.login = jest.fn().mockResolvedValue();
    await action(dispatch, undefined, { service, router });
    expect(dispatch).toHaveBeenNthCalledWith(1, authLoginRequest());
    expect(service.auth.login).toHaveBeenCalledWith(loginProps);
    expect(dispatch).toHaveBeenNthCalledWith(2, authLoginSucces());
    expect(router.navigate).toHaveBeenCalledWith(redirectUrl);
  });

  test("when login api rejects should follow error flow", async () => {
    const error = new Error("unathorized");
    service.auth.login = jest.fn().mockRejectedValue(error);
    await action(dispatch, undefined, { service });
    expect(dispatch).toHaveBeenNthCalledWith(1, authLoginRequest());
    expect(service.auth.login).toHaveBeenCalledWith(loginProps);
    expect(dispatch).toHaveBeenNthCalledWith(2, authLoginFailure(error));
  });
});
