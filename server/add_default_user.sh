#!/bin/bash

source variables.ini

if [[ ${DEPLOYMENT} != "PROD" ]]; then
    # Nothing to do if it's not PROD
    exit 0
fi

if [[ -z "${DEFAULT_USER_PASSWORD}" ]]; then
    echo "Variable DEFAULT_USER_PASSWORD can not be empty"
    exit 1
fi

# https://askubuntu.com/questions/94060/run-adduser-non-interactively
# https://arkit.co.in/four-ways-non-interactively-set-passwords-linux/
adduser "${DEFAULT_USER}" --disabled-login --gecos ""
echo "${DEFAULT_USER}:${DEFAULT_USER_PASSWORD}" | chpasswd
adduser sepraps sudo
