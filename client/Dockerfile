FROM node:21

WORKDIR /client/src/

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","run", "start"]
