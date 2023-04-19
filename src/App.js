import AdvertsPage from './components/adverts/AdvertsPage';
import LoginPage from './components/auth/LoginPage';
import './App.css';
import { useState } from 'react';
import NewAdvertPage from './components/adverts/NewAdvertPage';
import { Route, Routes, Navigate } from 'react-router-dom';
import AdvertPage from './components/adverts/AdvertPage';
import RequireAuth from './components/auth/RequireAuth';

// eslint-disable-next-line react/prop-types
function App({ isInitiallyLogged }) {
  const [isLogged, setIsLogged] = useState(isInitiallyLogged);

  const handleLogin = () => {
    setIsLogged(true);
  };

  const handleLogout = () => {
    setIsLogged(false);
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route
          path="/adverts/new"
          element={
            <RequireAuth isLogged={isLogged}>
              <NewAdvertPage onLogout={handleLogout} isLogged={isLogged} />
            </RequireAuth>
          }
        />
        <Route
          path="/adverts"
          element={<AdvertsPage onLogout={handleLogout} isLogged={isLogged} />}
        />
        <Route
          path="/adverts/:advertId"
          element={<AdvertPage onLogout={handleLogout} isLogged={isLogged} />}
        />
        <Route path="/" element={<Navigate to="/adverts" />} />
        <Route path="/404" element={<div>404 | Not Found</div>} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
}

export default App;
