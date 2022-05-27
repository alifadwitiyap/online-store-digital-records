FROM node:latest

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY  package.json /usr/src/app

RUN npm install

COPY  . /usr/src/app

RUN npm run down

RUN npm run up

EXPOSE 5000

CMD ["npm","start"]