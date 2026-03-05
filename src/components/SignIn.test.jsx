import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import { SignInContainer } from "./SignIn";

describe("SignInContainer", () => {
  it("calls onSubmit with correct arguments when form is submitted", async () => {
    const onSubmit = jest.fn();

    render(<SignInContainer onSubmit={onSubmit} />);

    fireEvent.changeText(screen.getByTestId("usernameField"), "kalle");

    fireEvent.changeText(screen.getByTestId("passwordField"), "password");

    fireEvent.press(screen.getByTestId("submitButton"));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);

      expect(onSubmit.mock.calls[0][0]).toEqual({
        username: "kalle",
        password: "password",
      });
    });
  });
});
