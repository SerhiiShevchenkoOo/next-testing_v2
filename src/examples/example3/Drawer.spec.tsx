import { render, screen } from "@testing-library/react";
import { MyDrawer } from "./Drawer";
import user from "@testing-library/user-event";

jest.mock("@material-ui/core", () => ({
  ...jest.requireActual("@material-ui/core"),
  SwipeableDrawer: jest.fn(() => <div>HELLOOOOOO</div>),
}));

describe("Drawer", () => {
  it('shows no "Hello YouTube!"', () => {
    render(<MyDrawer />);
    expect(screen.getByText("HELLOOOOOO")).toBeInTheDocument();
  });

  it('clicking on "Open Drawer" Button shows "Hello YouTube!"', async () => {
    render(<MyDrawer />);
    await user.click(screen.getByRole("button", { name: "Open Drawer" }));
    expect(screen.getByText("HELLOOOOOO")).toBeInTheDocument();
  });
});
