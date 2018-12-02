FROM node:dubnium-alpine

COPY ./src ./validator
WORKDIR /validator
COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
RUN yarn install --non-interactive --frozen-lockfile

CMD ["node", "index.js", "validate"]
