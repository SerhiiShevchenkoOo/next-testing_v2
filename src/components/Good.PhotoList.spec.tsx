/* eslint-disable @typescript-eslint/no-explicit-any */
import { setupServer } from "msw/node";
import { DefaultRequestBody, PathParams, rest } from "msw";
import { Photo } from "../models/Photo";
import {
  screen,
  render,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { PhotosList } from "./PhotosList";
import user from "@testing-library/user-event";
import { server } from "./Mock.server.spec";

describe("after application fully loads", () => {
  beforeEach(async () => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<PhotosList />);
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
  });

  it("renders the photos", () => {
    expect(screen.getByText("Unknown: Hello World")).toBeInTheDocument();
  });

  describe('when clicking in "Refresh" Button', () => {
    beforeEach(async () => {
      await user.type(screen.getByLabelText("Your Name:"), "Bruno");
      await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
    });

    it("renders the newly loaded data", () => {
      expect(screen.getByText("Bruno: Hello World")).toBeInTheDocument();
    });
  });

  describe('when clicking in "Refresh" Button and server returns error', () => {
    beforeEach(async () => {
      server.use(
        rest.get<DefaultRequestBody, { message: string }>(
          "/api/photos",
          (req, res, ctx) => {
            return res(
              ctx.status(500),
              ctx.json({ message: "Sorry Something happened!" })
            );
          }
        )
      );
      await user.click(screen.getByText("Refresh"));
      await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
    });

    it("renders the error keeping the old data", () => {
      expect(screen.getByText("Sorry Something happened!")).toBeInTheDocument();
    });
  });

  describe('when clicking in "Add to Favourites" changes the button text', () => {
    beforeEach(async () => {
      await user.click(
        screen.getByRole("button", { name: "Add To Favourites" })
      );
      // eslint-disable-next-line testing-library/prefer-query-by-disappearance
      await waitForElementToBeRemoved(() =>
        screen.getByRole("button", { name: "Add To Favourites" })
      );
    });

    it('renders "Remove from Favourites"', () => {
      expect(
        screen.getByRole("button", { name: "Remove from Favourites" })
      ).toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "Add to Favourites" })
      ).not.toBeInTheDocument();
    });
  });
});
