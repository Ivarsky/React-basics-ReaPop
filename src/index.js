import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import storage from './utils/storage';
import { setAuthorizationHeader } from './api/client';
import configureStore from './redux';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './components/auth/context';
import 'bootstrap/dist/css/bootstrap.min.css';

const accessToken = storage.get('auth');
if (accessToken) {
  setAuthorizationHeader(accessToken);
}

const store = configureStore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider isInitiallyLogged={!!accessToken}>
        <App />
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
