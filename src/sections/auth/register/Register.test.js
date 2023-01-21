import Register, { validateEmail } from "../Register";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

const onSubmit = jest.fn();

describe("Test the Register Component", () => {
  test("render the Register form submit button on the screen", async () => {
    render(<Register />);
    const buttonList = await screen.findAllByRole("button");
    expect(buttonList).toHaveLength(2);
  });

  test("should be failed on email validation ", () => {
    const testEmail = "dipesh.com";
    expect(validateEmail(testEmail)).not.toBe(true);
  });

  test("email input field should accept email ", () => {
    render(<Register />);
    const email = screen.getByPlaceholderText("Enter email");
    userEvent.type(email, "dipesh");
  });

  test("passport input should have type password ", () => {
    render(<Register />);
    const password = screen.getByPlaceholderText("Password");
  });

  test("should display alert if error", () => {
    render(<Register />);
    const email = screen.getByPlaceholderText("Enter email");
    const password = screen.getByPlaceholderText("Password");
    const buttonList = screen.getAllByRole("button");

    userEvent.type(email, "dipesh");
    userEvent.type(password, "123456");
    userEvent.click(buttonList[0]);
    const error = screen.getByText("Email is not valid");
    expect(error).toBeInTheDocument();
  });

  test("should be able to reset the form ", () => {
    const { getByLabelText, getByTestId } = render(<Register />);
    const resetBtn = getByTestId("reset");
    const emailInputNode = getByLabelText("Email");
    const passwordInputNode = getByLabelText("Password");
    fireEvent.click(resetBtn);
    expect(emailInputNode.value).toMatch("");
    expect(passwordInputNode.value).toMatch("");
  });

  test("should be able to submit the form", () => {
    const component = render(<Register />);
    const email = screen.getByPlaceholderText("Enter email");
    const password = screen.getByPlaceholderText("Password");
    const btnList = screen.getAllByRole("button");

    userEvent.type(password, "123456");
    userEvent.click(btnList[0]);

    expect(user).toBeInTheDocument();
  });
});