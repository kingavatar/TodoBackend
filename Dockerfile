FROM node:12-alpine
ENV ENV="PROD"

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install 

COPY . .

RUN chmod -R 755 run.sh

ENTRYPOINT [ "sh" , "./run.sh" ]
