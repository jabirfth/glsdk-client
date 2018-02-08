FROM node:8 as builder

ENV BUILD_FOLDER=/usr/src/app

WORKDIR ${BUILD_FOLDER}

COPY package*.json ${BUILD_FOLDER}/
RUN npm install

COPY . ${BUILD_FOLDER}/
RUN npm run build -- --env=prod

#

FROM nginx:1.13-alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html/app
