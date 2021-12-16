#!/bin/bash

chmod -x /etc/cron.daily/mlocate

SERVICES=("cups" "cups-browsed" "bluetooth")

OS_CODENAME=$(lsb_release -cs)

if [[ "${OS_CODENAME}" == "precise" ]]; then
    for service in "${SERVICES[@]}"; do
        [[ -f "/etc/init.d/${service}" ]] && update-rc.d "${service}" disable
    done
else
    for service in "${SERVICES[@]}"; do
        systemctl disable "${service}"
    done
fi

apt-get purge unity-lens-shopping software-center unity-lens-music ubuntuone* python-ubuntuone-storage* deja-dup*

rm -rf ~/.local/share/ubuntuone
rm -rf ~/.cache/ubuntuone
rm -rf ~/.config/ubuntuone
rm -rf ~/.config/sofware-center
rm -rf ~/.cache/software-center

rm -f /etc/init/tty{2,3,4,5,6}.conf
