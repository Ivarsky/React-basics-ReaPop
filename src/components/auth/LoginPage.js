import { useContext, useState } from 'react';
import Button from '../shared/Button';
import { login } from './service';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from './context';

// eslint-disable-next-line react/prop-types
function LoginPage() {
  const { onLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // eslint-disable-next-line no-undef
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const resetError = () => {
    setError(null);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    resetError(), setIsLoading(true);
    try {
      await login(credentials);
      setIsLoading(false);
      //Logged In
      onLogin();
      //Redirect to ultima pagina o home
      const to = location.state?.from?.pathname || '/';
      navigate(to);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
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

  const buttonDisabled =
    isLoading || !credentials.username || !credentials.password;

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
      {error && (
        <div onClick={resetError} className="loginPage-error">
          {error.message}
        </div>
      )}
    </div>
  );
}

export default LoginPage;
