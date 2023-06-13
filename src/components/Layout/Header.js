import { Button } from 'react-bootstrap';
import { ReactComponent as Icon } from '../../assets/beer-svgrepo-com.svg';
import { logout } from '../auth/service';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Header.css';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../../store/actions';
import { getIsLogged } from '../../store/selectors';

// eslint-disable-next-line react/prop-types
const Header = () => {
  const isLogged = useSelector(getIsLogged);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => dispatch(authLogout());

  const handleLogoutClick = async () => {
    await logout();
    onLogout();
    navigate('/login');
  };

  return (
    <header>
      <Link to="/">
        <div>
          <Icon width="32" height="32" />
        </div>
      </Link>
      <nav className="navBar">
        <div className="links">
          <NavLink to="/adverts/new">Create new Advert!</NavLink> |{' '}
          <NavLink to="/adverts" end>
            See Latests adds!
          </NavLink>
        </div>
        {isLogged ? (
          <Button variant="primary" onClick={handleLogoutClick}>
            Logout
          </Button>
        ) : (
          <Button as={Link} to="/login">
            Login
          </Button>
        )}
      </nav>
    </header>
  );
};

export default Header;
