#!/bin/bash

# Builds the assets for the deploy

set -euo pipefail

[[ "${0}" != ./scripts/deploy.sh ]] && echo "Call the script from the proyect root" && exit 1
[[ -z "${VIRTUAL_ENV}" ]] && echo "virtualenv should be activated before continue" && exit 1

# shellcheck source=../server/variables.ini
source server/variables.ini

FOLDER="/tmp/${TODAY}_${PROJECT_NAME}_deploy"

rm -rf "${FOLDER}"
mkdir -p "${FOLDER}"

echo "
## Build provision scripts
"
./scripts/util/build_server_scripts_file.sh "${FOLDER}/${TODAY}_${PROJECT_NAME}_server_scripts.tar.gz"

echo "
## Build instalable application file
"
./scripts/util/build_web_deploy_file.sh
cp dist/"${PROJECT_NAME}"*.tar.gz "${FOLDER}"

echo "
## Build database dump
"
PG_DUMP=pg_dump
if [[ -f /usr/lib/postgresql/${PG_VERSION}/bin/pg_dump ]]; then
    PG_DUMP=/usr/lib/postgresql/${PG_VERSION}/bin/pg_dump
fi

PG_DUMP_VERSION=$(${PG_DUMP} --version | grep -oE '[0-9.]*' | cut -d'.' -f1)

if [[ "${PG_DUMP_VERSION}" != "${PG_VERSION}" ]]; then
    echo >&2 "Si la versión de pg_dump (${PG_DUMP_VERSION}) es mayor a la versión de PostgreSQL (${PG_VERSION}) puede haber problemas al hacer pg_restore"
fi

"${PG_DUMP}" -Fc -Z9 -E UTF8 -h localhost -p "${PG_PORT}" -U postgres -d "${DBNAME}" -f "${FOLDER}/${TODAY}_${PROJECT_NAME}.dump"

echo "
## Build media file
"
tar czvf "${FOLDER}/${TODAY}_media_${PROJECT_NAME}.tar.gz" -C back media

echo "
## Finished
"
echo "Deploy files build on: ${FOLDER}"
for filepath in /tmp/"${TODAY}_${PROJECT_NAME}_deploy"/*; do
    [[ -e "${filepath}" ]] || continue
    MD5=$(md5sum "${filepath}" | cut -d' ' -f1)
    SIZE=$(du -h "${filepath}" | cut -f1)
    echo -e "${filepath}:\t\t ${MD5}\t${SIZE}"
done
