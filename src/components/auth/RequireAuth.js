import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './context';

// eslint-disable-next-line react/prop-types
const RequireAuth = ({ children }) => {
  const { isLogged } = useContext(AuthContext);
  const location = useLocation();
  if (!isLogged) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};

export default RequireAuth;
