FROM node:6-alpine
RUN apk add --no-cache bash curl openssl git

WORKDIR /app
COPY app/package.json .
RUN npm install
COPY app/ ./

RUN git clone https://github.com/lukas2511/dehydrated.git dehydrated

VOLUME ["/certs","/accounts","/well-known"]

ENTRYPOINT ["bash", "/app/start.sh"]
