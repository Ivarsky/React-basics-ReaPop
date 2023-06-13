import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsLogged } from '../../store/selectors';

// eslint-disable-next-line react/prop-types
const RequireAuth = ({ children }) => {
  const isLogged = useSelector(getIsLogged);
  const location = useLocation();

  if (!isLogged) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};

export default RequireAuth;
