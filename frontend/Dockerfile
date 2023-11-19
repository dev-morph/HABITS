FROM node:20.9-alpine

RUN npm config set registry http://registry.npmjs.org/
RUN cd /usr && mkdir app

WORKDIR /usr/app
COPY package*.json ./

RUN npm ci --force

COPY ./ ./

#Executed When Container launched
CMD ["npm", "run", "serve"]