import client, {
  removeAuthorizationHeader,
  setAuthorizationHeader,
} from '../../api/client';
import storage from '../../utils/storage';

export const login = loginProps => {
  return client
    .post('/api/auth/login', loginProps.credentials)
    .then(({ accessToken }) => {
      setAuthorizationHeader(accessToken);
      loginProps.checkbox ? storage.set('auth', accessToken) : () => {};
    });
};

export const logout = () => {
  return Promise.resolve().then(() => {
    removeAuthorizationHeader();
    storage.remove('auth');
  });
};
