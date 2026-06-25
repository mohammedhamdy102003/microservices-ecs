FROM node:18-alpine

WORKDIR /app

COPY package.json .
COPY app.js .

RUN npm install

EXPOSE 3001

CMD ["node", "app.js"]
