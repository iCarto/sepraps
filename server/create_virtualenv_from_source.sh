#!/bin/bash

set -euo pipefail

DEPLOY_FILE="${1:-/dev/null}"

this_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null && pwd)"

# shellcheck source=variables.ini
source "${this_dir}"/variables.ini

# Creamos el directorio donde almacenaremos los ficheros subidos por los usuarios de la app
mkdir -p "${WWW_MEDIA_PATH}"
chown -R "${DEFAULT_USER}":"${DEFAULT_USER}" "${WWW_MEDIA_PATH}"

# Gestionamos el directorio donde instalaremos la aplicación / virtualenv
# Si el directorio ya existe lo renombramos
if [[ -d "${WWW_PATH}" ]]; then
    # readlink used to avoid issues with final '/' being or not present
    BACKUP_FOLDER=$(readlink -e "${WWW_PATH}").${TODAY}
    rm -rf "${BACKUP_FOLDER}"
    mv "${WWW_PATH}" "${BACKUP_FOLDER}"
fi

mkdir -p "${WWW_PATH}"
cd "${WWW_PATH}"

"${PYTHON_DIR}/bin/python3" -m venv venv
# shellcheck disable=SC1091
source venv/bin/activate

# Estamos dentro del virtualenv. `python` ya es el del virtualenv
python -m pip install --upgrade pip

if [[ -f "${DEPLOY_FILE}" ]]; then
    python -m pip install "${DEPLOY_FILE}"
fi

chown -R "${DEFAULT_USER}":"${DEFAULT_USER}" "${WWW_PATH}"

# Salimos del virtualenv
deactivate

if systemctl list-units --full -all | grep -Fq "${PROJECT_NAME}.service"; then
    systemctl restart "${PROJECT_NAME}"
fi
