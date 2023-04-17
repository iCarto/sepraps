#!/bin/bash
set -e

# See also this scripts to check if a port is open:
# https://github.com/vishnubob/wait-for-it
# https://github.com/David-Lor/python-wait4it

this_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null && pwd)"

source "${this_dir}"/../../server/variables.ini

# create the database
# - if there is something already running on the database port, quit
# (this script assumes you want to run a local postgres instance)
if lsof -Pi :"${PG_PORT}" -sTCP:LISTEN -t > /dev/null; then
    lsof -iTCP:"${PG_PORT}" -sTCP:LISTEN
    PID_TO_KILL=$(lsof -Pi :"${PG_PORT}" -sTCP:LISTEN -t)
    echo "* process already running on port ${PG_PORT}, can't set up a new database. Please kill it to proceed:"
    echo "kill ${PID_TO_KILL}"
    exit 1
else
    echo "* port ${PG_PORT} free, so we're good to go..."
fi
# ok, we're safe to start the postgres process
if [[ ! -d tmp/postgres ]]; then
    echo "* initialising the DB"
    mkdir -p tmp/postgres
    initdb tmp/postgres
    postgres -D tmp/postgres -p "${PG_PORT}" &
    echo $! > tmp/postgres.pid
    sleep 3
    psql postgres -p "${PG_PORT}" -c "create user ${PROJECT_NAME} with password '${PROJECT_NAME}';"
    psql postgres -p "${PG_PORT}" -c "create database ${PROJECT_NAME} encoding 'utf8' template template0 owner ${PROJECT_NAME};"
    sleep 3
    pipenv run python manage.py migrate
    PID_TO_KILL="$(cat tmp/postgres.pid)"
    kill "${PID_TO_KILL}"
    echo "* DB ready"
else
    echo "* the DB already exists, checking if it needs migrations"
    postgres -D tmp/postgres -p "${PG_PORT}" &
    echo $! > tmp/postgres.pid
    sleep 3
    pipenv run python manage.py migrate
    PID_TO_KILL="$(cat tmp/postgres.pid)"
    kill "${PID_TO_KILL}"
fi
