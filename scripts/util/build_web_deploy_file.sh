#!/bin/bash

set -euo pipefail

# this_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null && pwd)"
# echo $this_dir
[[ -z "${VIRTUAL_ENV}" ]] && echo "virtualenv should be activated before continue" && exit 1

# cd "${this_dir}"/..

rm -rf dist
rm -rf ./*.egg-info

export DISABLE_ESLINT_PLUGIN=true
# Increase memory space for compiling client
export NODE_OPTIONS="--max_old_space_size=1024"
# shellcheck disable=SC1007
cd front && npm install && REACT_APP_API_BASE_URL= npm run build && cd ..
./scripts/install.link_back_front.sh

cd back && python manage.py collectstatic --no-input --clear && cd ..

python -m build --sdist
# python -m build --wheel
# python -m build
