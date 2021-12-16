#!/bin/bash

this_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null && pwd)"

# shellcheck source=variables.ini
source "${this_dir}"/variables.ini

# if [ "${INSTALL_PYTHON_FROM}" == "pyenv" ]; then
#     # shellcheck source=load_pyenv.sh
#     source "${this_dir}"/load_pyenv.sh
#     load_pyenv
#     _PYTHON_PATH=$(pyenv shell "${PYTHON_VERSION}" && pyenv which python)
#      _VIRTUALENVWRAPPER_PATH=$(dirname "${_PYTHON_PATH}")/virtualenvwrapper.sh
# else
#     _PYTHON_PATH=$(command -v "python${PYTHON_VERSION}")
#     _VIRTUALENVWRAPPER_PATH=/usr/local/bin/virtualenvwrapper.sh
# fi

_PYTHON_PATH=$(command -v "python3")
_VIRTUALENVWRAPPER_PATH=/usr/local/bin/virtualenvwrapper.sh

echo "VIRTUALENVWRAPPER_PYTHON=${_PYTHON_PATH}" >> ~/.bashrc
echo "source ${_VIRTUALENVWRAPPER_PATH}" >> ~/.bashrc

export VIRTUALENVWRAPPER_PYTHON="${_PYTHON_PATH}"
# shellcheck disable=SC1094,SC1090
source "${_VIRTUALENVWRAPPER_PATH}"

echo 'cdproject' >> ~/.virtualenvs/postactivate

sudo mkdir -p "${WWW_PATH}"

if [[ "${INSTALL_PYTHON_FROM}" == "pyenv" ]]; then
    # shellcheck source=load_pyenv.sh
    source "${this_dir}"/load_pyenv.sh
    load_pyenv
    mkvirtualenv -p "$(pyenv shell "${PYTHON_VERSION}" && pyenv which python)" -a "${WWW_PATH}" "${PROJECT_NAME}"
else
    mkvirtualenv -p "${_PYTHON_PATH}" -a "${WWW_PATH}" "${PROJECT_NAME}"
fi

workon "${PROJECT_NAME}"
[[ -f "${WWW_PATH}/requirements.txt" ]] && pip install -r "${WWW_PATH}/requirements.txt"
[[ -f "${WWW_PATH}/setup.py" ]] && python setup.py install

# Don't remove. If scripts ends with because setup.py does not exists it
# returns a failure status and the caller could ends
echo "Virtualenv installed"
