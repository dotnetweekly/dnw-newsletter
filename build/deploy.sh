#!/bin/bash

cp -TR "./" "../wwwroot/"
cd "../wwwroot"
rm -rf node_modules
npm install --only=production