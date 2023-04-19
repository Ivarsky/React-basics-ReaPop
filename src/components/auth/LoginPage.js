import { useState } from 'react';
import Button from '../shared/Button';
import { login } from './service';
import { useLocation, useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const location = useLocation();
  // eslint-disable-next-line no-undef
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = async event => {
    event.preventDefault();
    await login(credentials);

    //Estoy logueado
    onLogin();

    //Redirect to ultima pagina o home
    const to = location.state?.from?.pathname || '/';
    navigate(to);
  };

  const handleChange = event => {
    console.log(event.target.value, event.target.name);

    // if (event.target.name === 'username'){
    //   setCredentials({...credentials, username: event.target.value});
    // }
    // if (event.target.name === 'password') {
    //   setCredentials({...credentials, password: event.target.value});
    // }
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const buttonDisabled = !credentials.username || !credentials.password;

  return (
    <div>
      <h1>Log in to your Account</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          onChange={handleChange}
          value={credentials.username}
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={credentials.password}
        />
        <Button type="submit" variant="primary" disabled={buttonDisabled}>
          Log In
        </Button>
      </form>
    </div>
  );
}

export default LoginPage;
