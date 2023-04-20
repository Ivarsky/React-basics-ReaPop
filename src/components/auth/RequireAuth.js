import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context';

// eslint-disable-next-line react/prop-types
const RequireAuth = ({ children }) => {
  const { isLogged } = useAuth();
  const location = useLocation();
  if (!isLogged) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};

export default RequireAuth;
