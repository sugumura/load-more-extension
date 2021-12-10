#!/bin/bash

echo "production build start"

rm -rf dist/*

npx rollup --config rollup.config.production.js

cp -f manifest.json dist
cp -rf assets dist
cp -rf src/views dist

echo "build finish"

