#!/bin/bash

# set -e: stops the script on error
# set -u: stops the script on unset variables
# set -o pipefail:  fail the whole pipeline on first error
set -euo pipefail

# If a first command line argument exists, use it as value for local variable
# DEPLOYMENT overwritting default or env variable value
# The value of the env variable will not be changed, even if export is used
# inside the script if it's executed (bash variables.ini or ./variables.ini),
# but it's changed even without using export if it's sourced
# DEPLOYMENT="${1:-${DEPLOYMENT}}"
DEPLOYMENT="${1}"

if [[ "${DEPLOYMENT}" != "DEV" ]] && [[ "${DEPLOYMENT}" != "PROD" ]] && [[ "${DEPLOYMENT}" != "STAGE" ]]; then
    echo "First argument must be a valid DEPLOYMENT value: DEV | PROD | STAGE"
    exit 1
fi

if [[ ${DEPLOYMENT} == "DEV" ]]; then
    # bootstrap is copied with another name to /tmp when provisioning Vagrant
    # so "this_dir" trick does not work
    cd /vagrant/server

    this_dir=$(pwd)
else
    this_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null && pwd)"
    if [[ -z ${FIRST_TIME_DEPLOY} ]]; then
        echo "PROD mode must be execute from first_time_deploy.sh"
        exit 1
    fi
    echo "Deploying PROD"
    cd "${this_dir}"
fi

# Descargamos aquí paquetes a modo de cache. Se puede borrar el directorio
# cuando se quiera
mkdir -p "${this_dir}/downloads"

# shellcheck source=variables.ini
source "${this_dir}/variables.ini"

# https://serverfault.com/questions/500764/
# https://unix.stackexchange.com/questions/22820
# https://unix.stackexchange.com/questions/146283/
# Take care DEBIAN_FRONTEND and -o Dpkg::Options::=--force-confnew can
# set not desired configurations. Maybe set it in each needed call will be
# better
export DEBIAN_FRONTEND=noninteractive
export UCF_FORCE_CONFFNEW=1

apt-get update

bash set_hostname_and_ip.sh

# ./fix_locales_en.sh
# ./fix_locales_es.sh
./fix_locales.sh

bash config_time.sh

./disable_not_needed_services.sh

./config_ssh.sh

sed -i 's%.*history-search-backward%"\\e[5~": history-search-backward%' /etc/inputrc
sed -i 's%.*history-search-forward%"\\e[6~": history-search-forward%' /etc/inputrc

./install_others.sh
# bash install_gdal.sh
./install_git.sh

./install_postgres.sh
./install_sqitch.sh

bash install_node_and_npm.sh
./create_python_virtualenv_project.sh

./install_apache.sh

./own_settings.sh

./install_ufw.sh

./install_letsencrypt.sh

bash do_dist_upgrade.sh
