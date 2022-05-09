/* eslint-disable testing-library/no-render-in-setup */
import { render, screen, waitFor } from "@testing-library/react";
import { Counter } from "./Counter";
import user from "@testing-library/user-event";

describe("Counter", () => {
  describe('initialized with defaultCount=10 and description="WWW"', () => {
    beforeEach(() => {
      render(<Counter defaultCount={10} description="WWW" />);
    });

    it('renders "Current Count: 10"', () => {
      expect(screen.getByText("Current Count: 10")).toBeInTheDocument();
    });

    it('renders title as "WWW"', () => {
      expect(screen.getByText(/WWW/)).toBeInTheDocument();
    });

    describe('when the incrementor changes to 5 and "+" button is clicked', () => {
      beforeEach(async () => {
        await user.type(
          screen.getByLabelText(/Incrementor/),
          "{selectall}{backspace}{del}5"
        );
        await user.click(
          screen.getByRole("button", { name: "Add to Counter" })
        );
        await screen.findByText("Current Count: 15");
      });

      it('renders "Current Count: 15"', () => {
        expect(screen.getByText("Current Count: 15")).toBeInTheDocument();
      });

      describe('when the incrementor changes to empty string and "+" button is clicked', () => {
        beforeEach(async () => {
          await user.type(
            screen.getByLabelText(/Incrementor/),
            "{selectall}{backspace}"
          );
          await user.click(
            screen.getByRole("button", { name: "Add to Counter" })
          );
        });

        it('renders "Current Count: 15"', () => {
          expect(screen.getByText("Current Count: 15")).toBeInTheDocument();
        });
      });
    });

    describe('when the incrementor changes to 25 and "-" button is clicked', () => {
      beforeEach(async () => {
        await user.type(
          screen.getByLabelText(/Incrementor/),
          "{selectall}{backspace}25"
        );
        await user.click(
          screen.getByRole("button", { name: "Subtract from Counter" })
        );
        await screen.findByText("Current Count: -15");
      });

      it('renders "Current Count: -15"', () => {
        expect(screen.getByText("Current Count: -15")).toBeInTheDocument();
      });
    });
  });

  describe('initialized with defaultCount=0 and description="My Counter"', () => {
    beforeEach(() => {
      render(<Counter defaultCount={0} description="My Counter" />);
    });

    it('renders "Current Count: 0"', () => {
      expect(screen.getByText("Current Count: 0")).toBeInTheDocument();
    });

    it('renders title as "MyCounter"', () => {
      expect(screen.getByText(/my counter/i)).toBeInTheDocument();
    });

    describe("when - is clicked", () => {
      beforeEach(async () => {
        await user.click(
          screen.getByRole("button", { name: "Subtract from Counter" })
        );
      });

      it('renders "Current count: 1"', async () => {
        const label = await screen.findByText("Current Count: -1");
        await waitFor(() => expect(label).toBeInTheDocument());
        expect(screen.getByText("Current Count: -1")).toBeInTheDocument();
      });
    });

    describe("when + is clicked", () => {
      beforeEach(async () => {
        await user.click(
          screen.getByRole("button", { name: "Add to Counter" })
        );
      });

      it('renders "Current count: -1"', async () => {
        const label = await screen.findByText("Current Count: 1");
        await waitFor(() => expect(label).toBeInTheDocument());
        expect(screen.getByText("Current Count: 1")).toBeInTheDocument();
      });
    });
  });
});
