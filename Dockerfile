FROM node:20.16.0 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:stable
COPY --from=build /app/dist/cashregister/browser /usr/share/nginx/html
EXPOSE 80
