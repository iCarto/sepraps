#!/bin/bash

source variables.ini

apt-get -y install git
# sudo -u "${DEFAULT_USER}" -H ./config_git_dotfiles.sh
bash ./config_git_dotfiles.sh
