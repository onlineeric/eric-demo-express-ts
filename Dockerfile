FROM node:22-alpine

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --production

COPY dist ./server

EXPOSE 5000

CMD ["node", "server/server.js"]