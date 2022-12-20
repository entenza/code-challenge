FROM node:14.17.0-alpine

RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm install yarn
# RUN yarn install

COPY . .

EXPOSE 3000

ENTRYPOINT ["npm", "run", "start:dev"]