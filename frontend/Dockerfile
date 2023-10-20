FROM node:18-alpine

RUN cd /usr && mkdir app

WORKDIR /usr/app
RUN npm i -g @vue/cli-service
COPY package*.json ./

RUN npm ci

COPY ./ ./

#Executed When Container launched
CMD ["npm", "run", "serve"]