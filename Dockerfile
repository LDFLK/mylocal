# build environment
FROM node:14.19.0-alpine3.15 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

ARG SERVER_HOST=https://f2c7f522-ef47-48ce-a429-3fc2f15d2011-dev.e1-us-east-azure.choreoapis.dev/ldf/my-local-service/v1.0

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh python3 make g++

COPY package.json package-lock.json ./
RUN npm ci 
RUN npm install react-scripts@3.4.1 -g --silent
COPY . .
ENV REACT_APP_SERVER_HOST=$SERVER_HOST
ENV BUILD_PATH='./build/mylocal'

RUN npm run build

# host environment
FROM nginx:1.25.1-alpine

# Update and upgrade Alpine packages
RUN apk update && apk upgrade

COPY --from=build /app/build/mylocal /usr/share/nginx/html/mylocal
RUN rm /etc/nginx/conf.d/default.conf
COPY /app/nginx/nginx.conf /etc/nginx/nginx.conf
COPY /app/nginx/mime.types /etc/nginx/mime.types

# Create necessary directories and set permissions
RUN mkdir -p /tmp/nginx /var/cache/nginx /var/run /var/log/nginx && \
    chown -R 10014:10014 /tmp/nginx /var/cache/nginx /var/run /var/log/nginx /usr/share/nginx/html/mylocal && \
    chmod -R 755 /tmp/nginx /var/cache/nginx /var/run /var/log/nginx /usr/share/nginx/html

# Create a non-root user
RUN adduser -D -u 10014 choreouser

# Switch to the non-root user
USER 10014

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]