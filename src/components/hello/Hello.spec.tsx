import { render, screen } from "@testing-library/react";
import { Hello } from "./Hello";

it("renders correctly", () => {
  render(<Hello />);
  const myElement = screen.getByText(/Hello World/i);
  expect(myElement).toBeInTheDocument();
});
