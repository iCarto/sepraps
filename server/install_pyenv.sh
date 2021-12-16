#!/bin/bash
# shellcheck disable=SC2016

this_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null && pwd)"

# shellcheck source=variables.ini
source "${this_dir}"/variables.ini

# shellcheck source=load_pyenv.sh
source "${this_dir}"/load_pyenv.sh

sudo apt-get update
sudo apt-get install -y make build-essential libssl-dev zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm libncursesw5-dev xz-utils tk-dev libxml2-dev libxmlsec1-dev libffi-dev liblzma-dev

# As local user. Not as root

curl -L https://github.com/pyenv/pyenv-installer/raw/master/bin/pyenv-installer | bash

# the sed invocation inserts the lines at the start of the file
# after any initial comment lines
if [[ "${BASH_ENV}" == ".bashrc" ]]; then
    echo "https://github.com/pyenv/pyenv/issues/264"
    exit 1
fi

# Don't modify indendation in the following commands

# Defines the directory under which Python versions and shims reside.
sed -Ei -e '/^([^#]|$)/ {a \
export PYENV_ROOT="${HOME}/.pyenv"
a \
export PATH="${PYENV_ROOT}/bin:${PATH}"
a \
' -e ':a' -e '$!{n;ba};}' ~/.profile

echo '
eval "$(pyenv init --path)"
' >> ~/.profile

echo '

eval "$(pyenv init -)"
# Activate (or deactivate) automatically a virtualenv on enter (or exit) in
# a directory with a .python-version file that contains the name of a virtualenv
# managed with pyenv-virtualenv
# eval "$(pyenv virtualenv-init -)"
' >> ~/.bashrc

load_pyenv

# shared libraries are need to install mod_wsgi
env PYTHON_CONFIGURE_OPTS="--enable-shared" pyenv install "${PYTHON_VERSION}"
