FROM node:16.3.0-alpine as builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . . 
RUN yarn build

FROM node:16.3.0-alpine
WORKDIR /app
RUN apk add busybox-extras curl
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/process.yml ./process.yml
COPY --from=builder /app/tsconfig.json .

RUN yarn global add pm2

CMD ["pm2-runtime", "process.yml"]