FROM node:15.8.0

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

# 後で確認出来るようにpackage.jsonを作成
COPY .npmrc /app/.npmrc
RUN npm install -g npm@7.5.2
RUN npm init -y
RUN npm i --no-optional next react react-dom

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

RUN npm i --no-optional -g vercel@latest
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"dev\": \"next dev\", /g" /app/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"build\": \"next build\", /g" /app/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"start\": \"next start\", /g" /app/package.json

### fetch ... SSGで必要。
RUN npm i --no-optional isomorphic-unfetch

# 環境変数読込
RUN npm i --no-optional dotenv --save-dev

# スタイリング
RUN npm i --no-optional -D styled-components styled-media-query
