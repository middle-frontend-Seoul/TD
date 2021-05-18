FROM node:12-alpine

WORKDIR /app

#install node_modules
COPY package.json /app
COPY package-lock.json /app
RUN npm install

#install app
COPY . /app

CMD npm run start:dev
