FROM node:18-alpine

WORKDIR /client
COPY package*.json ./
RUN npm install
COPY . /client/
RUN chmod -R a+x node_modules
EXPOSE 3000
CMD ["npm", "run", "dev"]