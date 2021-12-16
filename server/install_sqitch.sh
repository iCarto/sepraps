#!/bin/bash

# set -e: stops the script on error
# set -u: stops the script on unset variables
# set -o pipefail:  fail the whole pipeline on first error
set -euo pipefail

source variables.ini

apt-get install -y cpanminus libdbd-pg-perl
cpanm --quiet --notest "App::Sqitch@${SQITCH_VERSION}"

if [[ ${DEPLOYMENT} == "DEV" ]]; then
    # No necesario en producción. Se usa para hacer templates más sencillos
    # https://justatheory.com/2013/09/sqitch-templating/#upgraded-templates
    cpanm Template
fi
