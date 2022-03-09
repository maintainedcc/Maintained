
FROM amd64/node:16-alpine as builder
WORKDIR /app
EXPOSE 3000
COPY . .
RUN npm install

FROM builder as nightly
ENV VITE_VERSION=nightly
ENV VITE_MAINTAINED_LOGIN_URL=https://nightly.id.maintained.cc/oauth/login
ENV VITE_MAINTAINED_API_BASE=https://nightly.api.maintained.cc
ENV VITE_MAINTAINED_ID_BASE=https://nightly.id.maintained.cc
ENV VITE_MAINTAINED_TAI_BASE=https://nightly.tai.maintained.cc
RUN npm run build
CMD ["node", "./build"]

FROM builder as production
ENV VITE_VERSION=1.0-beta.3
ENV VITE_MAINTAINED_LOGIN_URL=https://id.maintained.cc/oauth/login
ENV VITE_MAINTAINED_API_BASE=https://api.maintained.cc
ENV VITE_MAINTAINED_ID_BASE=https://id.maintained.cc
ENV VITE_MAINTAINED_TAI_BASE=https://tai.maintained.cc
RUN npm run build
CMD ["node", "./build"]