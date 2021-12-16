#!/bin/bash

source variables.ini

load_pyenv() {
    # After the first install, pyenv needs a full restart of the shell (logout
    # the system) is need as it puts variables in .profile.
    # But use a trick like `exec "${SHELL}"` in a script does not work. So we
    # use this workaround
    echo "Instalando pyenv"
    PYENV_ROOT="$(getent passwd "${DEFAULT_USER}" | cut -d: -f6)/.pyenv"
    export PYENV_ROOT
    export PATH="${PYENV_ROOT}/bin:${PATH}"
    eval "$("${PYENV_ROOT}"/bin/pyenv init --path)"
    eval "$("${PYENV_ROOT}"/bin/pyenv init -)"
}
