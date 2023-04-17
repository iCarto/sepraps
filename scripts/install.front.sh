#!/bin/bash

set -euo pipefail

if [[ ! -f front/package.json ]]; then
    echo "Skip installing frontend"
    exit
fi

(
    cd front || exit
    npm install
)

this_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null && pwd)"
# create the .env file
echo "* creating initial .env file"
"${this_dir}/util/echo_env_front.sh" > front/.env
