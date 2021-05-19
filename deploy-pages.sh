#!/usr/bin/env bash

set -e

npm run build
npm run apidoc

git worktree add pages gh-pages

cp dist/index.js pages/lib/jsdoc-type-pratt-parser/
cp -r docs pages/

cd pages
git add --all
git commit --author='gh-pages deployment script <>' -m 'deploy update'
git push ${REPOSITORY:-origin} gh-pages
