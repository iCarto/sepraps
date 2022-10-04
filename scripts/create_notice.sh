#!/bin/bash

NOTICE_FILEPATH=${1}
EXCLUDE_OWN_NPM_PACKAGE=${2}

if [[ ! -f "${NOTICE_FILEPATH}" ]]; then
    echo "Create notice file before continue. Touch is enougth"
    echo "touch ${NOTICE_FILEPATH}"
    exit 1
fi

{
    echo "
Estas son las dependencias y licencias usadas en el proyecto. Se incluyen únicamente aquellas dependencias usadas por la aplicación y no dependencias de desarrollo.

Todas ellas son compatibles con la AGPL usada para licenciar la aplicación.

Dependencias Python:

"

    pip-licenses --ignore-packages $(python scripts/python_notice.py back/requirements.txt) --with-authors --with-urls --from=meta --format=markdown

    echo "
Dependencias Javascript:
"

    (cd front && npx license-checker --production --csv --excludePackages "'${EXCLUDE_OWN_NPM_PACKAGE}'")

} > "${NOTICE_FILEPATH}"

(cd front && npx license-checker --production --summary --excludePackages "'${EXCLUDE_OWN_NPM_PACKAGE}'")
pip-licenses --ignore-packages $(python scripts/python_notice.py back/requirements.txt) --with-authors --with-urls --from=meta --format=markdown --summary
