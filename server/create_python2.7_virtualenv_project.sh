#!/bin/bash

source variables.ini

# $1 system user used to create the project
# $2 absolute or relative path to the folder which is going to be used, if not exists will be created
# $3 name of the virtualenv

apt-get install -y "python${PYTHON_VERSION}" python-pip

# Workaround for old ubuntu versions
# apt-get install -y curl
# curl "https://bootstrap.pypa.io/get-pip.py" -o "get-pip.py"
# python get-pip.py
# End of workaround

pip install --upgrade pip
pip install virtualenvwrapper

sudo -u "${DEFAULT_USER}" -H "${SETTINGS}"/config_virtualenv_dotfiles.sh
