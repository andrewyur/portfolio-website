FROM node:22-alpine as builder

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

FROM ghcr.io/static-web-server/static-web-server:2
WORKDIR /
COPY --from=builder /app/dist /public

CMD ["--port", "8080",  "--root",  "/public"]