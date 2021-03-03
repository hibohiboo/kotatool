FROM node:14.16.0

# コンテナ上の作業ディレクトリ作成
WORKDIR /app/internals/component-catalog
RUN npm install -g npm@7.6.0

COPY package.json /app/internals/component-catalog/package.json
COPY package-lock.json /app/internals/component-catalog/package-lock.json

RUN npm ci

# Story Book
# https://github.com/storybookjs/storybook/issues/12983
RUN npm i -D @storybook/cli@next
# RUN npx sb upgrade --prerelease
RUN npx --force sb init --type react --builder webpack5
# RUN npm i --no-optional -D --legacy-peer-deps @storybook/react @storybook/addon-links @storybook/addon-essentials @storybook/addon-actions
RUN npm i --no-optional -D babel-preset-react-app
RUN npm i --no-optional -D @storybook/addon-knobs@next
RUN npm i --no-optional -D @storybook/addon-storysource@next
RUN npm i --no-optional -D @storybook/addon-viewport@next
RUN npm i --no-optional -D @storybook/addon-backgrounds@next
RUN npm i --no-optional -D @storybook/builder-webpack5@next
RUN npm i --no-optional -D @storybook/addon-console
# storybookのwebpackでローダーを使えるようにする
RUN npm i --no-optional -D css-loader style-loader
RUN npm i --no-optional -D precss autoprefixer postcss

RUN npm i --no-optional -D sass-loader
RUN npm i --no-optional -D fibers
RUN npm i --no-optional -D postcss-loader@5

# webpack5 storybook error
RUN npm i --no-optional -D html-webpack-plugin@5 --force

# : SassError: Can't find stylesheet to import. @import '~bootstrap/scss/functions';
WORKDIR /app
RUN npm i --no-optional -D bootstrap@next
# Error from chokidar 対策。 https://yatta47.hateblo.jp/entry/2020/11/21/213106
# コンテナのfs.inotify.max_user_watchesは変えられないので、動かしているホストで実行。
# RUN sysctl fs.inotify.max_user_watches=24288
