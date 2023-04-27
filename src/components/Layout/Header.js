import { Button } from 'react-bootstrap';
import { ReactComponent as Icon } from '../../assets/twitter.svg';
import { logout } from '../auth/service';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/context';
import { Nav } from 'react-bootstrap';

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
      <Nav className="justify-content-center">
        <Nav.Item>
          <Nav.Link to="/adverts/new">Create new Advert!</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link to="/adverts" end>
            See Latests adds!
          </Nav.Link>
        </Nav.Item>
        {isLogged ? (
          <Button variant="primary" onClick={handleLogoutClick}>
            Logout
          </Button>
        ) : (
          <Button as={Link} to="/login">
            Login
          </Button>
        )}
      </Nav>
    </header>
  );
};

export default Header;
