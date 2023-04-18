import Button from '../shared/Button';

import { ReactComponent as Icon } from '../../assets/twitter.svg';

const Header = () => {
  return (
    <header>
      <div>
        <Icon width="32" height="32" />
      </div>
      <nav>
        <Button>Login</Button>
      </nav>
    </header>
  );
};

export default Header;
