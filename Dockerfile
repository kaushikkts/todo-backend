FROM postgres:latest AS todo-db
COPY init.sql /docker-entrypoint-initdb.d/



FROM node:latest AS todo-backend
WORKDIR /app
COPY . .
RUN npm install
RUN npm install -g prisma nodemon
RUN npm run build
COPY . .
EXPOSE 3000
CMD ["npm", "start"]


