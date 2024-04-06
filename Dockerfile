FROM node:18.20-slim as builder
WORKDIR /usr/src/app

COPY package.json yarn.lock ./

# Install dependencies, keeping production node_modules separate for later stages
RUN yarn install --silent --production \
    && cp -R node_modules node_modules_dist \
    && yarn install --silent

COPY webpack.server.js tsconfig.json ./
COPY ./src ./src

RUN yarn build

############################
# Production Image
############################
FROM node:18.20-alpine3.19 as production
WORKDIR /usr/app

COPY --from=builder /usr/src/app/node_modules_dist ./node_modules
COPY --from=builder /usr/src/app/build ./build
COPY --from=builder /usr/src/app/src/app/index.html ./src/app/index.html
COPY --from=builder /usr/src/app/src/public/base.css ./src/public/base.css
COPY --from=builder /usr/src/app/package.json ./

ENV NODE_ENV production
CMD ["node", "build/server.js"]
