FROM node:latest

RUN mkdir -p client/node_modules && chown -R node:node /client

WORKDIR /client

COPY --chown=node:node . .

USER node

RUN npm install

EXPOSE 5173

CMD [ "npm", "run", "dev" ]
