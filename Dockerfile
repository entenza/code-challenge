FROM node:14.17.0-alpine

RUN mkdir /app
WORKDIR /app
COPY package*.json yarn.lock ./
RUN npm install yarn
RUN yarn install

COPY . .

EXPOSE 3000

ENTRYPOINT ["yarn", "start:dev"]