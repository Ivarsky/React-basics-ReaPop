import { useState } from 'react';
import { login } from './service';
import { useLocation, useNavigate } from 'react-router-dom';
import { Alert, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  authLoginFailure,
  authLoginRequest,
  authLoginSucces,
  uiResetError,
} from '../../store/actions';
import { getUi } from '../../store/selectors';

// eslint-disable-next-line react/prop-types
function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, error } = useSelector(getUi);
  //TODO:borra esto
  //const [isLoading, setIsLoading] = useState(false);
  //const [error, setError] = useState(null);
  const [checkBox, setCheckBox] = useState(false);
  // eslint-disable-next-line no-undef
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const loginProps = {
    credentials: credentials,
    //TODO: mejor mete el checkBox en credentials
    checkbox: checkBox,
  };
  console.log(loginProps);

  const resetError = () => {
    dispatch(uiResetError());
  };

  const onLogin = () => dispatch(authLoginSucces());

  const handleSubmit = async event => {
    event.preventDefault();

    dispatch(authLoginRequest());
    try {
      await login(loginProps);
      //Logged In
      onLogin();
      //Redirect to ultima pagina o home
      const to = location.state?.from?.pathname || '/';
      navigate(to);
    } catch (error) {
      dispatch(authLoginFailure(error));
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
      <Form
        onSubmit={handleSubmit}
        style={{ maxWidth: '500px' }}
        className="mx-auto"
      >
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={handleChange}
            value={credentials.email}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
            value={credentials.password}
          />
        </Form.Group>
        <Form.Group className="d-flex align-items-center justify-content-end">
          <Form.Label>Keep me logged in</Form.Label>
          <Form.Check
            type="switch"
            checked={checkBox}
            onChange={handleCheckbox}
            className="mx-3"
          />
        </Form.Group>

        <Button variant="primary" type="Submit" disabled={buttonDisabled}>
          Log in
        </Button>
      </Form>

      {error && (
        <Alert variant="danger" onClick={resetError}>
          {error.message}, click to dismiss
        </Alert>
      )}
    </div>
  );
}

export default LoginPage;
