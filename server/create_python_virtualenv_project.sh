#!/bin/bash

this_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null && pwd)"

# shellcheck source=variables.ini
source "${this_dir}"/variables.ini

# shellcheck source=load_pyenv.sh
source "${this_dir}"/load_pyenv.sh

from_apt() {
    # http://railslide.io/virtualenvwrapper-python3.html
    apt-get install -o Dpkg::Options::=--force-confnew -y "python${PYTHON_VERSION}" python3-pip
    pip3 install --upgrade pip
}

# Combine virtualenvwrapper and pyenv is a bit weird sometimes, and a bit
# difficult to automate the provissioning. So we install virtualenvwrapper on a
# system python3 version
# We also install "default" `python` package to avoid weird behaviours
if [[ "${OS_CODENAME}" == "jammy" ]]; then
    # A partir de Ubuntu 22.04 jammy, ya no existe el "python", hay "python2" y
    # "python3" que viene instalado por defecto. En realidad es probable que
    # el paquete "python" a secas no fuera necesario instalarlo en ningún caso
    # y se podría eliminar este if
    apt-get install -o Dpkg::Options::=--force-confnew -y python3 python3-pip
else
    apt-get install -o Dpkg::Options::=--force-confnew -y python python3 python3-pip
fi

pip3 install --upgrade pip

pip3 install virtualenvwrapper

if [[ "${INSTALL_PYTHON_FROM}" == "apt" ]]; then
    from_apt
    sudo -u "${DEFAULT_USER}" --preserve-env=DEPLOYMENT,PG_POSTGRES_PASSWD,DEFAULT_USER_PASSWORD -H "${SETTINGS}"/create_virtualenv.sh

elif [[ "${INSTALL_PYTHON_FROM}" == "source" ]]; then
    "${SETTINGS}"/install_python_from_source.sh
    sudo -u "${DEFAULT_USER}" --preserve-env=DEPLOYMENT,PG_POSTGRES_PASSWD,DEFAULT_USER_PASSWORD -H "${SETTINGS}"/create_virtualenv_from_source.sh
elif [[ "${INSTALL_PYTHON_FROM}" == "pyenv" ]]; then
    # install_pyenv se ejecuta sin tener en cuenta las variables de entorno seteadas. Si se le pasa PROD a bootstrap
    # cuando se lea variables.ini dentro de install_pyenv PROD no estará seteada y usará DEV
    sudo -u "${DEFAULT_USER}" --preserve-env=DEPLOYMENT,PG_POSTGRES_PASSWD,DEFAULT_USER_PASSWORD -H "${SETTINGS}"/install_pyenv.sh
    sudo -u "${DEFAULT_USER}" --preserve-env=DEPLOYMENT,PG_POSTGRES_PASSWD,DEFAULT_USER_PASSWORD -H "${SETTINGS}"/create_virtualenv.sh
else
    echo "Error de parámetro" && exit 1
fi
