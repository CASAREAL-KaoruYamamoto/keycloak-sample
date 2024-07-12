# build application
FROM node:lts AS build
COPY . /home/workspace
WORKDIR /home/workspace
RUN npm install && npm run build

# install application on the web server
FROM nginx:stable AS runtime
COPY --from=build /home/workspace/dist /usr/share/nginx/html
