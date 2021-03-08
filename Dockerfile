FROM node:14

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y lame

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD [ "npm", "run", "start" ]
