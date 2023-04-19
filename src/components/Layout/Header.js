import Button from '../shared/Button';
import { ReactComponent as Icon } from '../../assets/twitter.svg';
import { logout } from '../auth/service';
import { Link, NavLink } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const Header = ({ isLogged, onLogout }) => {
  const handleLogoutClick = async () => {
    await logout();
    onLogout();
  };

  return (
    <header>
      <Link to="/">
        <div>
          <Icon width="32" height="32" />
        </div>
      </Link>
      <nav>
        <NavLink to="/adverts/new">New tweet!</NavLink>|
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
