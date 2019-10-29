FROM node:lts-slim as build-stage

WORKDIR /client

# COPY ./nginx.conf /nginx.conf

COPY package*.json /client/

RUN npm install -g @angular/cli

COPY ./ /client/

# RUN npm run build -- --output-path=./dist/out

# FROM nginx:1.15

# COPY --from=build-stage /client/dist/out/ /usr/share/nginx/html

# COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf
