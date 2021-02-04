#!/bin/bash

bin_dir=$(cd $(dirname $0) && pwd)
composeFile=${1:-"docker-compose.yml"}
container_name=${1:-zeit_vercel}
# docker-composeの起動
cd $bin_dir/../docker && docker-compose run --service-ports $container_name npm run dev

