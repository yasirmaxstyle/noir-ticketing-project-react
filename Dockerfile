FROM node:lts-alpine
LABEL org.opencontainers.image.source https://github.com/yasirmaxstyle/noir-ticketing-project-react.git

WORKDIR /workspace

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:latest

COPY --from=0 /workspace/dist/ /usr/share/nginx/html/

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80