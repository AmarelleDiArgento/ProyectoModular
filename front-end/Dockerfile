# FROM node:11.15.0-alpine AS build-step
# WORKDIR /app
# ADD package.json ./
# RUN npm install 
# ADD . .
# RUN npm run build


FROM nginx:1.16.0-alpine as prod-stage
# COPY  --from=build-step /app/dist/front-end /usr/share/nginx/html 
COPY  /dist/front-end /usr/share/nginx/html 
# EXPOSE  80
# CMD ["nginx", "-g", "daemon off;"]