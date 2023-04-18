import Button from '../shared/Button';
import { ReactComponent as Icon } from '../../assets/twitter.svg';
import { logout } from '../auth/service';

// eslint-disable-next-line react/prop-types
const Header = ({ isLogged, onLogout }) => {
  const handleLogoutClick = async () => {
    await logout();
    onLogout();
  };

  return (
    <header>
      <div>
        <Icon width="32" height="32" />
      </div>
      <nav>
        {isLogged ? (
          <Button onClick={handleLogoutClick}>Logout</Button>
        ) : (
          <Button>Login</Button>
        )}
      </nav>
    </header>
  );
};

export default Header;
