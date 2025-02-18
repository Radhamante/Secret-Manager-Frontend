# Étape 1 : Build de l'application Angular
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Étape 2 : Serveur Nginx pour servir l'application
FROM nginx:alpine
RUN apk add --no-cache gettext
COPY --from=build /app/dist/secret-manager /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8008
CMD ["/bin/sh", "-c", "envsubst < /usr/share/nginx/html/browser/env.js > /usr/share/nginx/html/browser/env.js.tmp && mv /usr/share/nginx/html/browser/env.js.tmp /usr/share/nginx/html/browser/env.js && exec nginx -g 'daemon off;'"]

