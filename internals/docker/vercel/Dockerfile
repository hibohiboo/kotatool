FROM node:15.8.0

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

# 後で確認出来るようにpackage.jsonを作成
COPY .npmrc /app/.npmrc
RUN npm init -y
RUN npm i --no-optional next
RUN npm i --no-optional react react-dom

# TypeScript追加
RUN npm i --no-optional -D typescript @types/react @types/react-dom @types/node

# resetcss
RUN npm i --no-optional -D sanitize.css

# Progressive Web Apps (PWA) 対応
RUN npm i --no-optional -D next-offline

# linter formatter
RUN npm i --no-optional -D eslint eslint-plugin-react prettier eslint-config-prettier eslint-plugin-prettier
RUN npm i --no-optional -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"lint\": \"eslint --ext .ts,.tsx --ignore-path .gitignore .\", /g" /app/package.json

# Story Book
# https://github.com/storybookjs/storybook/issues/12983
RUN npm i -D @storybook/cli
# RUN npx sb upgrade --prerelease
RUN npx --legacy-peer-deps sb init --type react
# RUN npm i --no-optional -D --legacy-peer-deps @storybook/react @storybook/addon-links @storybook/addon-essentials @storybook/addon-actions
RUN npm i --no-optional -D babel-preset-react-app
RUN npm i --no-optional -D @storybook/addon-knobs @storybook/addon-storysource @storybook/addon-viewport @storybook/addon-backgrounds @storybook/addon-console
## Story Shot
RUN npm i --no-optional -D @storybook/addon-storyshots @storybook/addon-storyshots-puppeteer puppeteer react-test-renderer
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"puppeteer-storyshots\": \"jest tests\/__tests__\/puppeteer-storyshots*.runner.ts\", /g" /app/package.json


### fetch ... SSGで必要。
RUN npm i --no-optional isomorphic-unfetch

# 環境変数読込
RUN npm i --no-optional dotenv --save-dev

# スタイリング
RUN npm i --no-optional -D styled-components styled-media-query


RUN npm i --no-optional -D webpack@4
RUN npm i --no-optional -D sharp
RUN npm i --no-optional -D encoding

### puppetieer troubleshooting
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install -y google-chrome-unstable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst ttf-freefont \
  --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*
RUN npm i --no-optional -D babel-preset-react-app
# https://qiita.com/riversun/items/63c5f08c8da604c5ec1a
RUN npm i --no-optional -D core-js@3
RUN npm i --no-optional -D sass
# storybookのwebpackでローダーを使えるようにする
RUN npm i --no-optional -D css-loader style-loader
# sass-loader 11以降はwebpack5が必要
# RUN npm i --no-optional -D --legacy-peer-deps  sass-loader
RUN npm i --no-optional -D sass-loader@10
