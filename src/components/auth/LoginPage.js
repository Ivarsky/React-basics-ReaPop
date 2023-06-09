import { useEffect, useRef, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authLogin, uiResetError } from "../../store/actions";
import { getUi } from "../../store/selectors";

// eslint-disable-next-line react/prop-types
function LoginPage() {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(getUi);
  const renders = useRef(0);
  const [checkBox, setCheckBox] = useState(false);
  // eslint-disable-next-line no-undef

  useEffect(() => {
    renders.current++;
  });

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const loginProps = {
    credentials: credentials,
    checkbox: checkBox,
  };

  const resetError = () => {
    dispatch(uiResetError());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(authLogin(loginProps));
  };

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleCheckbox = (event) => {
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
        style={{ maxWidth: "500px" }}
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
