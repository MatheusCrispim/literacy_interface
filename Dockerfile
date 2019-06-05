# base image
FROM node:latest

RUN mkdir -p app

WORKDIR /usr/src/app

COPY . /usr/src/app/

EXPOSE 5000

RUN npm install

RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s", "build"]
