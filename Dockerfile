# build environment
FROM node:14.19-slim as build
WORKDIR /mylocal
ENV PATH /mylocal/node_modules/.bin:$PATH

ARG SERVER_HOST=https://service.mylocal.datafoundation.lk

RUN apt-get update && apt-get install python -y && \
    apt-get install git -y && \
    apt-get install build-essential -y

COPY package.json ./
COPY package-lock.json ./
RUN npm ci 
RUN npm install react-scripts@3.4.1 -g --silent
COPY . .
ENV REACT_APP_SERVER_HOST=$SERVER_HOST
RUN npm run build

# production environment
FROM nginx
COPY --from=build /mylocal/build /usr/share/nginx/html/mylocal

# new
COPY --from=build /mylocal/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /mylocal/nginx/mime.types /etc/nginx/conf.d/mime.types

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
