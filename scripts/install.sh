#!/bin/bash -i
# We use -i to read .bashrc and have commands like rmvirtualenv available

# set -e: stops the script on error
# set -u: stops the script on unset variables. Da problemas con virtualenv
# set -o pipefail:  fail the whole pipeline on first error
set -eo pipefail

this_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null && pwd)"

source "${this_dir}"/util/env.sh

bash -i "${this_dir}"/util/check-os-deps.sh

# [[ -z "${VIRTUAL_ENV}" ]] && echo "virtualenv should be activated before continue" && exit 1

source "${this_dir}"/../server/variables.ini
cd "${this_dir}"/..

# Clean up
command -v deactivate && deactivate

: "${PROJECT_NAME}" # checks that project_name exists, if not an unbound variable is raised
(
    set +u
    rmvirtualenv "${PROJECT_NAME}"
) # does the remove without -u to avoid weird messages

# Developer Experience Setup
if ! pyenv versions | grep "${PYTHON_VERSION}" > /dev/null 2>&1; then
    pyenv update
    pyenv install "${PYTHON_VERSION}"
fi

PYTHON_VERSION_BINARY_PATH="$(pyenv shell "${PYTHON_VERSION}" && pyenv which python)"

# https://github.com/pexpect/pexpect/commit/71bbdf52ac153c7eaca631637ec96e63de50c2c7
mkvirtualenv -p "${PYTHON_VERSION_BINARY_PATH}" -a . "${PROJECT_NAME}" || true

workon "${PROJECT_NAME}"

if ! command -v deactivate; then
    echo "Not in a virtualenv. Can not continue."
    exit 1
fi

pip install -r requirements-dev.txt
npm install
pre-commit install --install-hooks

# backend stuff
bash scripts/install.back.sh

# frontend stuf
bash scripts/install.back.sh

# ./scripts/util/prod-package.sh

# FIXME
# link to UI
if [[ ! -e ${BACKEND_FOLDER_NAME}/back/static && ! -L ${BACKEND_FOLDER_NAME}/back/static ]]; then
    echo "* linking Django app to the JS frontend"
    mkdir -p "${this_dir}"/../front/build
    cd "${BACKEND_FOLDER_NAME}/back"
    ln -s ../../"${FRONTEND_FOLDER_NAME}"/build front_build
    cd "${this_dir}"
else
    echo "* frontend already linked"
fi

# app-specific
#-------------
"${this_dir}"/util/setup-custom.sh
"${this_dir}"/reset_and_create_db.sh

echo "* DONE :)"
