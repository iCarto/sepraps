#!/bin/bash

chmod -x /etc/cron.daily/mlocate

SERVICES=("cups" "cups-browsed" "bluetooth")

for service in "${SERVICES[@]}"; do
    systemctl disable "${service}"
done

apt-get purge unity-lens-shopping software-center unity-lens-music ubuntuone* python-ubuntuone-storage* deja-dup*

rm -rf ~/.local/share/ubuntuone
rm -rf ~/.cache/ubuntuone
rm -rf ~/.config/ubuntuone
rm -rf ~/.config/sofware-center
rm -rf ~/.cache/software-center

rm -f /etc/init/tty{2,3,4,5,6}.conf
