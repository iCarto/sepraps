#!/bin/bash

# set -e: stops the script on error
# set -u: stops the script on unset variables
# set -o pipefail:  fail the whole pipeline on first error
set -euo pipefail

source variables.ini

apt-get -y install git

# config git dotfiles
# sudo -u "${DEFAULT_USER}" -H ./config_git_dotfiles.sh
cp "${SETTINGS}"/other-settings/gitconfig "${DEFAULT_USER_HOME}/.gitconfig"
chown "${DEFAULT_USER}":"${DEFAULT_USER}" "${DEFAULT_USER_HOME}/.gitconfig"
