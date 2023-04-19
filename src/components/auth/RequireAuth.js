import { Navigate, useLocation } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const RequireAuth = ({ isLogged, children }) => {
  const location = useLocation();
  if (!isLogged) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};

export default RequireAuth;
