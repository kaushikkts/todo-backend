FROM postgres:latest AS todo-db
COPY init.sql /docker-entrypoint-initdb.d/



FROM node:latest AS todo-backend
WORKDIR /app
COPY . .
RUN npm install
RUN npm install -g prisma nodemon
EXPOSE 3000
RUN npm run build


