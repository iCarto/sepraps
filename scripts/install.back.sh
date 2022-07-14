#!/bin/bash
# set -e: stops the script on error
# set -u: stops the script on unset variables. Da problemas con virtualenv
# set -o pipefail:  fail the whole pipeline on first error
set -eo pipefail

this_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null && pwd)"

source "${this_dir}"/../server/variables.ini

# create the .env file
if [[ ! -f back/.env ]]; then
    echo "* creating initial .env file"
    echo "DEPLOYMENT=DEV
DEBUG=True
SECRET_KEY=your-secret-key
DATABASE_URL=psql://${DBOWNER}:${PG_POSTGRES_PASSWD}@localhost:${PG_PORT}/${DBNAME}
HTTPS=False
MONITORING_TEMPLATES_FOLDER=monitoring/data/project
DATABASE_CONTROL_CHANGES_MODE=migrations
" > back/.env

else
    echo "* back/.env file already exists"
fi

pip install -r back/requirements.txt
