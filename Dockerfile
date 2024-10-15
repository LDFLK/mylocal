# build environment
FROM node:14.19-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

ARG SERVER_HOST=https://f2c7f522-ef47-48ce-a429-3fc2f15d2011-dev.e1-us-east-azure.choreoapis.dev/ldf/my-local-service/v1.0

RUN apk update && apk upgrade && \
    apk add --no-cache git python3 make g++

COPY package.json package-lock.json ./
RUN npm ci
RUN npm install react-scripts@3.4.1 -g --silent
COPY . .
ENV REACT_APP_SERVER_HOST=$SERVER_HOST
ENV BUILD_PATH='./build/mylocal'

RUN npm run build

# production environment
FROM nginx:1.21-alpine

# Create the choreo user and group
RUN addgroup -g 10014 choreo && \
    adduser -D -u 10014 -G choreo choreouser

COPY --from=build /app/build/mylocal /usr/share/nginx/html/mylocal
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/mime.types /etc/nginx/mime.types

# Create necessary directories and set permissions
RUN mkdir -p /tmp/nginx/client_temp \
             /tmp/nginx/proxy_temp \
             /tmp/nginx/fastcgi_temp \
             /tmp/nginx/uwsgi_temp \
             /tmp/nginx/scgi_temp \
             /var/cache/nginx \
             /var/run && \
    chmod -R 777 /tmp/nginx /var/cache/nginx /var/run /etc/nginx /usr/share/nginx/html && \
    chown -R choreouser:choreo /tmp/nginx /var/cache/nginx /var/run /usr/share/nginx/html

# Explicitly set USER to 10014 (choreouser)
USER 10014

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]