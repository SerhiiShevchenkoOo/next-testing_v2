import { rest, PathParams, DefaultRequestBody } from "msw";
import { setupServer } from "msw/lib/types/node";
import { Photo } from "../models/Photo";

export const server = setupServer(
  rest.post<Photo, PathParams, Photo>("/api/favourite", (req, res, ctx) => {
    const photo = req.body;
    return res(
      ctx.delay(200),
      ctx.json({ ...photo, favourite: !photo.favourite })
    );
  }),

  rest.get<DefaultRequestBody, PathParams, Photo[]>(
    "/api/photos",
    (req, res, ctx) => {
      const name = req.url.searchParams.get("name") || "Unknown";
      return res(
        //   ctx.delay(100),
        ctx.json([
          {
            id: 1,
            thumbnailUrl: "/photo1.png",
            title: name + ": Hello World",
            favourite: false,
          },
        ])
      );
    }
  )
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
