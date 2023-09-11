FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY ./ ./

#Executed When Container launched
CMD ["npm", "run", "dev"]