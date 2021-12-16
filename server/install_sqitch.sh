#!/bin/bash

set -e

source variables.ini

apt-get install -y cpanminus libdbd-pg-perl
cpanm --quiet --notest "App::Sqitch@${SQITCH_VERSION}"

# No necesario en producción. Se usa para hacer templates más sencillos
# https://justatheory.com/2013/09/sqitch-templating/#upgraded-templates
cpanm Template
