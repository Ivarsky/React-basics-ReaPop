import Button from '../shared/Button';
import { ReactComponent as Icon } from '../../assets/twitter.svg';
import { logout } from '../auth/service';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/context';

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
      <nav>
        <NavLink to="/adverts/new">Create new Advert!</NavLink>|
        <NavLink to="/adverts" end>
          See Latests adds!
        </NavLink>
        {isLogged ? (
          <Button onClick={handleLogoutClick}>Logout</Button>
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
