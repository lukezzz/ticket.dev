FROM node:alpine

WORKDIR /app
COPY package.json .
RUN yarn config set registry 'https://registry.npm.taobao.org'
RUN yarn install --production --frozen-lockfile


COPY . .

ENV NODE_OPTIONS=--openssl-legacy-provider

CMD ["yarn", "dev"]