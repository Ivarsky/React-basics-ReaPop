import { fireEvent, render, screen } from "@testing-library/react";
import LoginPage from "../LoginPage";
import { Provider } from "react-redux";
import { defaultState } from "../../../store/reducers";
import { authLogin, uiResetError } from "../../../store/actions";

jest.mock("../../../store/actions");

const errorMessage = "Unauthorized, click to dismiss";

const defaultStateWithError = {
  ...defaultState,
  ui: {
    ...defaultState.ui,
    error: { message: "Unauthorized" },
  },
};

describe("LoginPage", () => {
  const renderComponent = () => {
    const store = {
      getState: () => defaultState,
      subscribe: () => {},
      dispatch: () => {},
    };
    return render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );
  };

  const renderComponentWithError = () => {
    const store = {
      getState: () => defaultStateWithError,
      subscribe: () => {},
      dispatch: () => {},
    };

    return render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );
  };

  test("snapshot", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  test("should dispatch authLogin action", () => {
    const email = "cabesa";
    const password = "1234";
    const checkbox = true;

    renderComponent();

    const emailInput = screen.getByLabelText(/Email address/);
    const passwordInput = screen.getByLabelText(/Password/);
    const submitButton = screen.getByRole("button");
    const checkboxButton = screen.getByRole("checkbox");

    expect(submitButton).toBeDisabled();
    expect(checkboxButton).not.toBeChecked();

    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.click(checkboxButton);

    expect(submitButton).toBeEnabled();
    expect(checkboxButton).toBeChecked();

    fireEvent.click(submitButton);

    expect(authLogin).toHaveBeenCalledWith({
      checkbox: checkbox,
      credentials: { email, password },
    });
  });

  test("should display an error", () => {
    renderComponentWithError();

    const errorElement = screen.getByText(errorMessage);
    expect(errorElement).toBeInTheDocument();

    fireEvent.click(errorElement);

    expect(uiResetError).toHaveBeenCalled();
  });
});
