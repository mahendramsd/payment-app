# Stage 1

FROM node:16-alpine3.11 as build-step

WORKDIR /app/

COPY package.json /app/

RUN cd /app && npm set progress=false && npm install

COPY . /app/

RUN cd /app && npm run build --prod

# stage 2

FROM nginx:1.19.4-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build-step /app/dist/payment-app/ /usr/share/nginx/html

COPY /payment-app.conf  /etc/nginx/conf.d/payment-app.conf

EXPOSE 8082

CMD ["nginx", "-g", "daemon off;"]