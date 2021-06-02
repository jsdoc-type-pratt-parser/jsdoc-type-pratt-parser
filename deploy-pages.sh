#!/usr/bin/env bash

set -e

git config --global user.name "${GITHUB_ACTOR}"
git config --global user.email "${GITHUB_ACTOR}@users.noreply.github.com"

npm ci
npm run build
npm run apidoc

git worktree add pages gh-pages

cp dist/index.js pages/lib/jsdoc-type-pratt-parser/
cp -r docs pages/

cd pages
git add --all
git commit -m 'deploy update'
git push ${REPOSITORY:-origin} gh-pages
