FROM node:20.9-alpine

RUN cd /usr && mkdir app

WORKDIR /usr/app

COPY package*.json ./
COPY ./src/database/ ./src/database/

RUN npm install -g dotenv-cli
RUN npm ci

COPY ./ ./

#Executed When Container launched
CMD ["npm", "run", "start:migrate:dev"]