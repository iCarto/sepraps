#!/bin/bash

set -e

# Maybe we should set APT::Install-Recommends globally
apt install -y --no-install-recommends npm
npm cache clean -f
npm install -g n
n stable
hash -r
npm i -g npm
