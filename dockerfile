# Étape 1 : Build de l'application Angular
FROM node:18 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Étape 2 : Serveur Nginx pour servir l'application
FROM nginx:alpine
COPY --from=build /app/dist/secret-manager /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8008
CMD ["nginx", "-g", "daemon off;"]
