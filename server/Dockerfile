#Dockerfile for the Node server service
FROM node:20.11.1

RUN npm install -g nodemon

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 5000

CMD ["npm", "run", "start"]