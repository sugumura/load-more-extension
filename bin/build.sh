#!/bin/bash

rm -rf dist/*

npx rollup --config

cp -f manifest.json dist
cp -rf assets dist
cp -rf src/views dist
