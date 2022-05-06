# syntax=docker/dockerfile:1

FROM node:latest

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn lint
RUN yarn test

RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start" ]
