FROM node:lts-alpine

WORKDIR /home/node/app

COPY ./package*.json ./

RUN npm install 

COPY ./ ./

CMD [ "node", "./bin/www" ]