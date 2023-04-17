#!/bin/bash

# shellcheck source=../../server/variables.ini
source server/variables.ini

set -euo pipefail

# ./scripts/util/prod-package.sh
# ./scripts/util/prod-commit.sh
# (
#     cd prod
#     git push heroku prod:master
# )

BRANCH=${1:-main}

git stash
git checkout "${BRANCH}"
git pull --rebase
git stash pop
# git clean -ndx Not do it because remove the .env

cd back && pip install -r requirements.txt && cd ..
export NODE_OPTIONS="--max_old_space_size=1024"
# cd front && npm install && npm run build && cd ..
bash scripts/install.link_back_front.sh
cd back && python manage.py collectstatic --no-input --clear && cd ..
if [[ "${DATABASE_CONTROL_CHANGES_MODE}" == "sqitch" ]]; then
    cd db && sqitch deploy && cd ..
else
    echo "Migrations not applied" >&2
fi
sudo systemctl restart apache2
