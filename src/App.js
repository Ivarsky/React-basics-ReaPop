import AdvertsPage from './components/adverts/AdvertsPage';
import LoginPage from './components/auth/LoginPage';
import './App.css';
import { useState } from 'react';
import NewAdvertPage from './components/adverts/NewAdvertPage';

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
      {isLogged ? (
        <>
          <AdvertsPage onLogout={handleLogout} isLogged={isLogged} />
          <NewAdvertPage onLogout={handleLogout} isLogged={isLogged} />
        </>
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
