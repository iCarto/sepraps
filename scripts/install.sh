#!/bin/bash -i
# We use -i to read .bashrc and have commands like rmvirtualenv available

set -e

this_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null && pwd)"

source "${this_dir}"/util/env.sh

bash -i "${this_dir}"/util/check-os-deps.sh

# [[ -z "${VIRTUAL_ENV}" ]] && echo "virtualenv should be activated before continue" && exit 1

source "${this_dir}"/../server/variables.ini
cd "${this_dir}"/..

# Clean up
rmvirtualenv "${PROJECT_NAME}"

command -v deactivate && deactivate

# Developer Experience Setup
if ! pyenv versions | grep "${PYTHON_VERSION}" > /dev/null 2>&1; then
    pyenv update
    pyenv install "${PYTHON_VERSION}"
fi

PYTHON_VERSION_BINARY_PATH="$(pyenv shell "${PYTHON_VERSION}" && pyenv which python)"

# https://github.com/pexpect/pexpect/commit/71bbdf52ac153c7eaca631637ec96e63de50c2c7
mkvirtualenv -p "${PYTHON_VERSION_BINARY_PATH}" -a . "${PROJECT_NAME}" || true

workon "${PROJECT_NAME}"
pip install -r requirements-dev.txt
npm install
pre-commit install --install-hooks

# backend stuff
# -------------

## Python setup

# create the .env file
if [[ ! -f .env ]]; then
    echo "* creating initial .env file"
    echo "DEPLOYMENT=DEV
DEBUG=True
SECRET_KEY=your-secret-key
DATABASE_URL=psql://${DBOWNER}:${PG_POSTGRES_PASSWD}@localhost:${PG_PORT}/${DBNAME}
HTTPS=False" > "${BACKEND_FOLDER_NAME}/.env"
else
    echo "* .env file already exists"
fi

pip install -r "${BACKEND_FOLDER_NAME}/requirements.txt"

# frontend stuff
# -------------

# FIXME. Something to do here? Probably not.
if [[ ! -d "${FRONTEND_FOLDER_NAME}" ]]; then
    create-react-app "${FRONTEND_FOLDER_NAME}"
fi
# build the frontend
(
    cd "${FRONTEND_FOLDER_NAME}"
    npm install
)

# ./scripts/util/prod-package.sh

# FIXME
# link to UI
if [[ ! -e ${BACKEND_FOLDER_NAME}/back/static && ! -L ${BACKEND_FOLDER_NAME}/back/static ]]; then
    echo "* linking Django app to the JS frontend"
    mkdir -p "${this_dir}"/../front/build
    cd "${BACKEND_FOLDER_NAME}/back"
    ln -s ../../"${FRONTEND_FOLDER_NAME}"/build static
    cd "${this_dir}"
else
    echo "* frontend already linked"
fi

# app-specific
#-------------
"${this_dir}"/util/setup-custom.sh
"${this_dir}"/reset_db_and_migrations.sh

echo "* DONE :)"

exit
