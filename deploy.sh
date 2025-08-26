#!/usr/bin/env bash
SERVER=craftthecode.dev
USER=hoanld
DEPLOY_PATH=/usr/share/nginx/craftthecode.dev
npm i
npm run build
rsync -auvrP --delete --rsync-path='sudo rsync' ./dist/ $USER@$SERVER:$DEPLOY_PATH/