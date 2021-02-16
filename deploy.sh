#!/usr/bin/env bash

set -e

npm run typecheck
npm run lint
npm run build
npm run apidoc

cp build/index.js pages/lib/jsdoc-type-pratt-parser/
cp -r build/docs pages/

cd pages
git add --all
git commit -m 'deploy update'
git push origin gh-pages
