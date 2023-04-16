import AdvertsPage from './components/adverts/AdvertsPage';
import LoginPage from './components/auth/LoginPage';
import './App.css';
import Button from './components/shared/Button';
import { useState } from 'react';

function App() {
  const [isLogged, setIsLogged] = useState(false);

  const handleLogin = () => {
    setIsLogged(true);
  };

  return (
    <div className="App">
      {isLogged ? <AdvertsPage /> : <LoginPage onLogin={handleLogin} />}
      {/* <Button onClick={(event) => console.log(event)}>Click me!</Button> */}
    </div>
  );
}

export default App;
