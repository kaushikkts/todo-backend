FROM ubuntu
RUN sudo apt-get update
RUN apt-get install -y curl
FROM ubuntu

RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get upgrade -y
RUN apt-get install -y nodejs

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
COPY dist /app/
WORKDIR /app
RUN npm install --production
RUN npm install -g pm2

ENTRYPOINT ["node", "index.js"]