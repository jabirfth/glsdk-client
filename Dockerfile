FROM node:8 as builder

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    echo "deb http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google.list && \
    apt-get update && \
    apt-get install -y google-chrome-stable && \
    apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

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
