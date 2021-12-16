#!/bin/bash
set -e

./scripts/util/prod-package.sh
./scripts/util/prod-commit.sh
(
    cd prod
    git push heroku prod:master
)

exit
