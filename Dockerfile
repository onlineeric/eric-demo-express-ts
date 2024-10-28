FROM node:latest

WORKDIR /app

COPY dist .

EXPOSE 5000

CMD ["node", "server.js"]