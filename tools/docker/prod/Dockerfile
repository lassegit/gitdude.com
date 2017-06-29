FROM node:8.1.0-alpine

WORKDIR /usr/src/app

COPY ./build/package.json .

ENV NODE_ENV production

RUN yarn install --production --no-progress

CMD [ "node", "server.js" ]
