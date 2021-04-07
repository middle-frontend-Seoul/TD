FROM node:13

WORKDIR /app

COPY . /app

RUN npm ci
RUN npm run build

EXPOSE 4000

CMD npm start
