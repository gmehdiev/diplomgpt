FROM node:lts-alpine3.18 as base
WORKDIR /usr/src/app

FROM base AS dependencies
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install

FROM base AS build
WORKDIR /usr/src/app
COPY . .
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
RUN npm run build


EXPOSE 3001/tcp
CMD [ "npm", "run", "start:migrate:prod" ]

