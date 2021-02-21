FROM node:14

WORKDIR /usr/app

RUN npm i -g @nestjs/cli@7.4.1

# COPY package*.json ./

# RUN npm install

COPY . .

# RUN npm run typeorm migration:run

EXPOSE 3000

CMD ["./docker-entrypoint.sh"]