FROM node:lts-alpine as build

WORKDIR /app

#COPY package*.json ./
#RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine as prod
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx/default.conf /etc/nginx/conf.d/default.template

CMD sh -c "envsubst \"`env | awk -F = '{printf \" \\\\$%s\", $1}'`\" < /etc/nginx/conf.d/default.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
