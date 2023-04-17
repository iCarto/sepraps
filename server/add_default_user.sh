#!/bin/bash

# set -e: stops the script on error
# set -u: stops the script on unset variables
# set -o pipefail:  fail the whole pipeline on first error
set -euo pipefail

# If the user does not exists, DEFAULT_USER_HOME will throw an error in
# variables.ini. So we only call this scripts from first_time_deploy.sh where
# DEFAULT_USER, DEPLOYMENT and DEFAULT_USER_PASSWORD, should be accesible
# shellcheck source=variables.ini
# source "${this_dir}/variables.ini"

if [[ "${DEPLOYMENT}" != "PROD" ]]; then
    # Nothing to do if it's not PROD
    exit 0
fi

if [[ -z "${DEFAULT_USER_PASSWORD}" ]]; then
    echo "Variable DEFAULT_USER_PASSWORD can not be empty"
    exit 1
fi

if lsb_release -sd | grep -i debian; then
    # En debian no está instalado sudo
    apt install sudo
fi

# https://askubuntu.com/questions/94060/run-adduser-non-interactively
# https://arkit.co.in/four-ways-non-interactively-set-passwords-linux/
adduser "${DEFAULT_USER}" --disabled-login --gecos ""
echo "${DEFAULT_USER}:${DEFAULT_USER_PASSWORD}" | chpasswd
adduser "${DEFAULT_USER}" sudo
