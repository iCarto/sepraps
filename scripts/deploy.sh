#!/bin/bash
set -euo pipefail

# ./scripts/util/prod-package.sh
# ./scripts/util/prod-commit.sh
# (
#     cd prod
#     git push heroku prod:master
# )

git stash
git checkout development
git pull --rebase
git stash pop
# git clean -ndx Not do it because remove the .env
cd back && pip install -r requirements.txt && cd ..
export NODE_OPTIONS=--max_old_space_size=1024
cd front && npm install && npm run build && cd ..
bash scripts/install.link_back_front.sh
cd back && echo -e 'yes' | python manage.py collectstatic -c && cd ..
cd db && sqitch deploy && cd ..
sudo systemctl restart apache2
