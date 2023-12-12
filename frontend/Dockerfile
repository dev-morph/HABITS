FROM node:20.9-alpine

RUN cd /usr && mkdir app

WORKDIR /usr/app
COPY package*.json ./

RUN npm i

COPY ./ ./

# RUN npm run build
#Executed When Container launched
CMD ["npm", "run", "prod"]