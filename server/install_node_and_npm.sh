#!/bin/bash

set -e

apt-get install npm
npm cache clean -f
npm install -g n
n stable
npm i -g npm
