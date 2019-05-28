FROM node:latest

WORKDIR /app

COPY package.json /app

RUN yarn

COPY . /app
CMD node index.js

EXPOSE 2375

