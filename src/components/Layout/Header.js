import { Button } from 'react-bootstrap';
import { ReactComponent as Icon } from '../../assets/twitter.svg';
import { logout } from '../auth/service';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/context';
import './Header.css';

// eslint-disable-next-line react/prop-types
const Header = () => {
  const { isLogged, onLogout } = useAuth();
  const navigate = useNavigate();

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
