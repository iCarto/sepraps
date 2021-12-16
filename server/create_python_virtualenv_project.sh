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
    apt-get update && sudo apt-get upgrade -y
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
apt-get install -o Dpkg::Options::=--force-confnew -y python python3 python3-pip
pip3 install --upgrade pip

pip3 install virtualenvwrapper

if [[ "${INSTALL_PYTHON_FROM}" == "apt" ]]; then
    from_apt
elif [[ "${INSTALL_PYTHON_FROM}" == "source" ]]; then
    from_source
elif [[ "${INSTALL_PYTHON_FROM}" == "pyenv" ]]; then
    sudo -u "${DEFAULT_USER}" -H "${SETTINGS}"/install_pyenv.sh
else
    echo "Error de parámetro" && exit 1
fi

sudo -u "${DEFAULT_USER}" -H "${SETTINGS}"/config_virtualenv_dotfiles.sh
