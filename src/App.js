import AdvertsPage from './components/adverts/AdvertsPage';
import LoginPage from './components/auth/LoginPage';
import './App.css';
import Button from './components/shared/Button';
import { useState } from 'react';

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
        <AdvertsPage onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
      {/* <Button onClick={(event) => console.log(event)}>Click me!</Button> */}
    </div>
  );
}

export default App;
