#!/usr/bin/env bash

cp build/index.js pages/lib/jsdoc-type-pratt-parser/
cd pages
git add --all
git commit -m 'deploy update'
git push origin gh-pages
