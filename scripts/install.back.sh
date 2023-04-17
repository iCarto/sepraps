#!/bin/bash

set -euo pipefail

if [[ -z "$(ls back)" ]]; then
    echo "Skip installing backend"
    exit
fi

this_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null && pwd)"

source "${this_dir}"/../server/variables.ini

# create the .env file
echo "* creating initial .env file"
"${this_dir}"/util/echo_env_back.sh > back/.env

# create the media folder (only for development purposes)
mkdir -p back/media

pip install --editable .

# python manage.py compilemessages
