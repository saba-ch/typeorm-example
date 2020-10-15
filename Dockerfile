FROM node:alpine3.12

WORKDIR /app

COPY package.json yarn.lock ./

RUN npm i

COPY . .

RUN npm run build:dev

EXPOSE 8000

CMD [ "npm", "run", "start:dev" ]