#!/bin/bash

this_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null && pwd)"

# shellcheck source=variables.ini
source "${this_dir}"/variables.ini

# shellcheck source=load_pyenv.sh
source "${this_dir}"/load_pyenv.sh

from_source() {
    # En debian 9 (stretch) python 3.6 no está en los repos
    # https://github.com/pyenv/pyenv/wiki/Common-build-problems
    # https://docs.python.org/3/using/unix.html#building-python
    apt update && sudo apt upgrade -y
    # libffi-dev liblzma-dev
    # python-openssl
    apt-get install -y make build-essential libssl-dev zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev libncursesw5-dev xz-utils tk-dev

    # No se puede hacer sobre /vagrant. Seguramente es porque hace un hardlink
    # en algún momento del proceso y no es válido en una carpeta compartida
    url="https://www.python.org/ftp/python/3.6.9/{Python-3.6.9.tgz}"
    curl "${url}" --create-dirs -o '/tmp/#1' --max-redirs 5 --location --silent --show-error
    tar xzp --file=/tmp/Python-3.6.9.tgz -C /tmp
    cd /tmp/Python-3.6.9 || exit
    # --enabled-shared
    # https://github.com/pyenv/pyenv/wiki#how-to-build-cpython-with---enable-shared
    # https://github.com/pyenv/pyenv/issues/392
    ./configure --enable-optimizations --with-ensurepip=install --enable-shared
    make -j8
    make altinstall

    cd /vagrant/server || exit
    rm -rf /tmp/Python-3.6.9.tgz
    rm -rf /tmp/Python-3.6.9
    ldconfig -v
}

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
elif [[ "${INSTALL_PYTHON_FROM}" == "source" ]]; then
    from_source
elif [[ "${INSTALL_PYTHON_FROM}" == "pyenv" ]]; then
    # install_pyenv se ejecuta sin tener en cuenta las variables de entorno seteadas. Si se le pasa PROD a bootstrap
    # cuando se lea variables.ini dentro de install_pyenv PROD no estará seteada y usará DEV
    sudo -u "${DEFAULT_USER}" --preserve-env=DEPLOYMENT,PG_POSTGRES_PASSWD,DEFAULT_USER_PASSWORD -H "${SETTINGS}"/install_pyenv.sh
else
    echo "Error de parámetro" && exit 1
fi

sudo -u "${DEFAULT_USER}" --preserve-env=DEPLOYMENT,PG_POSTGRES_PASSWD,DEFAULT_USER_PASSWORD -H "${SETTINGS}"/config_virtualenv_dotfiles.sh
