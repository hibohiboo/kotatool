FROM node:16.4.1

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

# 後で確認出来るようにpackage.jsonを作成
COPY .npmrc /app/.npmrc
RUN npm install -g npm@7.19.1
RUN npm init -y
RUN npm i --no-optional next react react-dom

# TypeScript追加
RUN npm i --no-optional -D typescript @types/react @types/react-dom @types/node

# resetcss
RUN npm i --no-optional -D sanitize.css

# linter formatter
RUN npm i --no-optional -D eslint eslint-plugin-react prettier eslint-config-prettier eslint-plugin-prettier
RUN npm i --no-optional -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"lint\": \"eslint --ext .ts,.tsx --ignore-path .gitignore .\", /g" /app/package.json

RUN npm i --no-optional -g vercel@latest
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"dev\": \"next dev\", /g" /app/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"build\": \"next build\", /g" /app/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"start\": \"next start\", /g" /app/package.json

### fetch ... SSGで必要。
RUN npm i --no-optional isomorphic-unfetch

# スタイリング
RUN npm i --no-optional -D styled-components styled-media-query

# https://github.com/vercel/next.js/issues/21679
# next:10.0.6 Error: Cannot find module 'webpack'
RUN npm i --no-optional -D --legacy-peer-deps webpack@latest
# https://github.com/vercel/next.js/issues/21679
# next:10.0.6 Error: Cannot find module 'webpack'
# Cannot find module 'sharp'
RUN npm i --no-optional -D sharp
# ModuleNotFoundError: Module not found: Error: Can't resolve 'encoding' in '/app/node_modules/node-fetch/lib'
RUN npm i --no-optional -D encoding

# use sass css module
RUN npm i --no-optional -D sass
RUN npm i --no-optional -D next-pwa@beta
RUN npm install eslint-plugin-react-hooks --save-dev
### firebase
RUN npm i --no-optional firebase
RUN npm i --no-optional date-fns
RUN npm i --no-optional date-fns-tz

RUN npm i -D --no-optional stylelint
RUN npm i -D --no-optional stylelint-scss
RUN npm i -D --no-optional stylelint-declaration-use-variable
RUN npm i -D --no-optional stylelint-prettier
RUN npm i -D --no-optional stylelint-config-prettier
RUN npm i -D --no-optional stylelint-config-recommended-scss
# displayの値によって無視されてしまうプロパティを見つけてくれるplugin
RUN npm i -D --no-optional stylelint-declaration-block-no-ignored-properties
# ブラウザ非対応のプロパティがないかを検知してくれるplugin
RUN npm i -D --no-optional stylelint-no-unsupported-browser-features


RUN npm i -D --no-optional postcss-preset-env postcss-flexbugs-fixes
RUN npm i -D classnames
# cssフレームワーク
RUN npm i -D bootstrap@next
RUN npm i -D stylelint-config-standard stylelint-config-recess-order
RUN npm i io-ts fp-ts

# test
RUN npm i -D jest ts-jest @types/jest

# img
RUN npm i react-dropzone

# ui
RUN npm i @material-ui/core

# udonarium
RUN npm i crypto-js

# file archver
RUN npm i file-saver jszip

# フリック処理
RUN npm i react-slick

## canvas library
RUN npm i --no-optional react-konva --save

# react convaが8に対応していないのでダウングレード
RUN npm i --no-optional konva@7 --save


# next11 lint
RUN npm i eslint-config-next

RUN sed -i -e 's/"license": "MIT",/"license": "MIT",\n  "browserslist": [">0.3%","not ie 11","not dead","not op_mini all"],/g' /app/package.json
