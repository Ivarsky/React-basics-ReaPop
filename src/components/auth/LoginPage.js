import { useState } from 'react';
import Button from '../shared/Button';
import { login } from './service';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './context';

// eslint-disable-next-line react/prop-types
function LoginPage() {
  const { onLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [checkBox, setCheckBox] = useState(false);
  // eslint-disable-next-line no-undef
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const loginProps = {
    credentials: credentials,
    checkbox: checkBox,
  };
  console.log(loginProps);

  const resetError = () => {
    setError(null);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    resetError(), setIsLoading(true);
    try {
      await login(loginProps);
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
    // if (event.target.name === 'username'){
    //   setCredentials({...credentials, username: event.target.value});
    // }
    // if (event.target.name === 'password') {
    //   setCredentials({...credentials, password: event.target.value});
    // }
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleCheckbox = event => {
    const { checked } = event.target;
    setCheckBox(checked);
  };

  const buttonDisabled =
    isLoading || !credentials.email || !credentials.password;

  return (
    <div>
      <h1>Log in to your Account</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={credentials.email}
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
        <div>
          <label>Keep me logged</label>
          <input type="checkbox" checked={checkBox} onChange={handleCheckbox} />
        </div>
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
