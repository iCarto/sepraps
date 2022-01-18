#!/bin/bash

set -e

# DEPLOYMENT="${1:-PROD}"
DEPLOYMENT="${1}"

if [[ ${DEPLOYMENT} == "DEV" ]]; then
    # FIX ME
    # "this_dir" trick does not seem to work with vagrant
    cd /vagrant/server

    # Descargamos aquí paquetes a modo de cache. Se puede borrar el directorio
    # cuando se quiera
    mkdir -p /vagrant/server/downloads

    # shellcheck source=variables.ini
    source /vagrant/server/variables.ini
else
    echo "Not ready to execute it directly in production jet"
    exit 1
fi

# https://serverfault.com/questions/500764/
# https://unix.stackexchange.com/questions/22820
# https://unix.stackexchange.com/questions/146283/
# Take care DEBIAN_FRONTEND and -o Dpkg::Options::=--force-confnew can
# set not desired configurations. Maybe set it in each needed call will be
# better
export DEBIAN_FRONTEND=noninteractive
export UCF_FORCE_CONFFNEW=1

apt-get update

bash add_default_user.sh

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

./create_python_virtualenv_project.sh

./install_apache.sh

./own_settings.sh

./install_ufw.sh

bash do_dist_upgrade.sh

is_installed() {
    if dpkg -s "${1}" > /dev/null 2>&1; then
        echo "is installed"
    fi
}
