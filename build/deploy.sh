#!/bin/bash

cp -R "./*" "../wwwroot/"
cd "../wwwroot"
npm install --only=production