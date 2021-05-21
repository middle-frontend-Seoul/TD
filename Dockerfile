FROM node:12-alpine

WORKDIR /app

COPY . /app

RUN npm ci
RUN npm run build

EXPOSE 5000

CMD npm start
