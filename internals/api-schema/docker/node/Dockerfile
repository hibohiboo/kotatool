FROM node:15.10.0

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

# 後で確認出来るようにpackage.jsonを作成
COPY .npmrc /app/.npmrc
RUN npm install -g npm@7.6.0
RUN npm init -y
RUN npm i -D redoc redoc-cli swagger-cli
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"build\": \"swagger-cli bundle -r .\/openapi.yml -o .\/openapi.json\", /g" /app/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"redoc\": \"npm run build \&\& redoc-cli bundle .\/openapi.json --options.menuToggle --options.pathInMiddlePanel  -o .\/dist\/index.html\", /g" /app/package.json
RUN mkdir -p /app/tmp
RUN cp package.json ./tmp/
RUN cp package-lock.json ./tmp/

RUN npm i -D openapi-typescript-codegen
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"generate\": \"swagger-cli bundle -t yaml -r .\/openapi.yml -o .\/bundle.yml \&\& npx openapi-typescript-codegen --input .\/bundle.yml --output .\/dist --exportCore false --exportServices false --exportModels true --useUnionTypes \",/g" /app/package.json
