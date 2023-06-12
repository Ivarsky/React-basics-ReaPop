import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import storage from './utils/storage';
import { setAuthorizationHeader } from './api/client';
import configureStore from './redux';
import { AuthContextProvider } from './components/auth/context';
import 'bootstrap/dist/css/bootstrap.min.css';
import Root from './Root';

const accessToken = storage.get('auth');
if (accessToken) {
  setAuthorizationHeader(accessToken);
}

const store = configureStore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Root store={store}>
      <AuthContextProvider isInitiallyLogged={!!accessToken}>
        <App />
      </AuthContextProvider>
    </Root>
  </React.StrictMode>,
);
