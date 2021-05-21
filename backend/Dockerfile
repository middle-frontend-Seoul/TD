FROM node:12-alpine

WORKDIR /app

#install node_modules
COPY package.json /app
COPY package-lock.json /app
RUN npm ci

#install app
COPY . /app

EXPOSE 3000

CMD npm run start:dev
