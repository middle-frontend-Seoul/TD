FROM node:12-alpine

WORKDIR /app

COPY . /app

RUN npm ci
RUN npm run build

CMD npm start
