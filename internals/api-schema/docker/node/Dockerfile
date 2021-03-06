FROM node:15.10.0

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

# 後で確認出来るようにpackage.jsonを作成
COPY .npmrc /app/.npmrc
RUN npm init -y
RUN npm i -D redoc redoc-cli swagger-cli
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"build\": \"swagger-cli bundle -r .\/openapi.yml -o .\/openapi.json\", /g" /app/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"redoc\": \"npm run build \&\& redoc-cli bundle .\/openapi.json --options.menuToggle --options.pathInMiddlePanel  -o .\/dist\/index.html\", /g" /app/package.json
RUN npm i -D @openapitools/openapi-generator-cli
# java install https://qiita.com/tshk_mtsys/items/a75870f903585e97cfd9
RUN apt-get update
RUN apt-get install curl unzip zip -y
RUN curl -s "https://get.sdkman.io" | bash
# https://qiita.com/clomie/items/235192bd62c60b0d0806
SHELL ["/bin/bash", "-l", "-c"]
RUN source "/root/.sdkman/bin/sdkman-init.sh"
RUN sdk install java 8.0.282-open
RUN npx openapi-generator-cli version-manager set 5.0.1

# ex) npm run build && npx openapi-generator-cli generate -g typescript-axios -i ./openapi.json -o ./dist/client-axios
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"generate\": \"openapi-generator-cli generate -g typescript-axios -i .\/bundle.yml -o .\/dist\/client-axios \", /g" /app/package.json
