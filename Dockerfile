FROM node:dubnium-alpine

RUN mkdir /validator
WORKDIR /validator
COPY ./src ./src
COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
RUN yarn install --non-interactive --frozen-lockfile

CMD ["node", "src", "validate"]
