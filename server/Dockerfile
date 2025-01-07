FROM node:latest

RUN mkdir -p /server/node_modules && chown -R node:node /server

WORKDIR /server

COPY --chown=node:node . .

USER node

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
