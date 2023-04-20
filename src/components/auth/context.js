import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext(null);

export const useAuth = () => {
  const authValue = useContext(AuthContext);
  return authValue;
};

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ isInitiallyLogged, children }) => {
  const [isLogged, setIsLogged] = useState(isInitiallyLogged);

  const handleLogin = () => {
    setIsLogged(true);
  };

  const handleLogout = () => {
    setIsLogged(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLogged, onLogout: handleLogout, onLogin: handleLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};
