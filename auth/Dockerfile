FROM node:alpine

WORKDIR /app
COPY package.json .
RUN yarn config set registry 'https://registry.npm.taobao.org'
RUN yarn

COPY . .

CMD ["yarn", "start"]