FROM node:15.10.0

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

# 後で確認出来るようにpackage.jsonを作成
COPY .npmrc /app/.npmrc
RUN npm init -y
RUN npm i -D redoc redoc-cli swagger-cli
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"build\": \"swagger-cli bundle -r .\/openapi.yml -o .\/openapi.json\", /g" /app/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"redoc\": \"npm run build \&\& redoc-cli bundle .\/openapi.json --options.menuToggle --options.pathInMiddlePanel  -o .\/dist\/redoc-static.html\", /g" /app/package.json

