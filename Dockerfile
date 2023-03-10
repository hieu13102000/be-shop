# chuẩn bị môi trường node.js version 14/alpine
FROM node:14-alpine
# nơi lưu trữ srouce code
WORKDIR /be-shop
COPY package*.json ./
RUN npm install
COPY . .
CMD npm start