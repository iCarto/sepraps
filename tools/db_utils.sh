#!/bin/bash

# set -e  # Porqué si se lanza desde cli se cierra el terminal

db_utils_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null && pwd)"
# shellcheck source=../server/variables.ini
source "${db_utils_dir}/../server/variables.ini"
unset db_utils_dir

kickout_users() {
    local DBNAME="${1}"
    ${PSQL} -h localhost -U postgres -d postgres -c "select pg_terminate_backend(pid) from pg_stat_activity where datname='${DBNAME}';"
}

drop_db_and_kickout_users() {
    local DBNAME="${1}"

    kickout_users "${DBNAME}"

    # To avoid problems. Uncomment if following a flow where is
    # really needed
    ${DROPDB} -h localhost -U postgres --if-exists "${DBNAME}"
}

create_db_from_template() {
    local TEMPLATE="${1}"
    local DBNAME="${2}"
    kickout_users "${TEMPLATE}"
    drop_db_and_kickout_users "${DBNAME}"
    ${CREATEDB} -h localhost -U postgres -T "${TEMPLATE}" "${DBNAME}"
}

create_db_from_template_and_dump() {
    local TEMPLATE="${1}"
    local DBNAME="${2}"
    # https://stackoverflow.com/a/2013589/930271
    # https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html
    local BCK_FOLDER="${3:-$(pwd)}"

    create_db_from_template "${TEMPLATE}" "${DBNAME}"
    ${PGDUMP} -h localhost -U postgres -Fc -Z9 -E UTF-8 -f "${BCK_FOLDER}/${DBNAME}.dump" "${DBNAME}"
}

create_last_db() {
    local DBNAME="${1}"
    local DUMP="${2}"
    drop_db_and_kickout_users "${DBNAME}"
    ${CREATEDB} -h localhost -U postgres "${DBNAME}"
    ${PGRESTORE} -h localhost -U postgres -d "${DBNAME}" "${DUMP}"
}

dump_db() {
    local DBNAME="${1}"
    local WHEN="${2:-bck}"
    local BCK_FOLDER="${3:-$(pwd)}"

    ${PGDUMP} -h localhost -U postgres -Fc -Z9 -E UTF-8 -f "${BCK_FOLDER}/${TODAY}_${WHEN}_${DBNAME}.dump" "${DBNAME}"
}

echo "Puerto en uso: ${PG_PORT}"
