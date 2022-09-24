#!/bin/bash
set -euo pipefail

this_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null && pwd)"
# shellcheck source=variables.ini
source "${this_dir}/variables.ini"

sed -e '/SendEnv/ s/^#*/#/' -i /etc/ssh/ssh_config
sed -e '/AcceptEnv/ s/^#*/#/' -i /etc/ssh/sshd_config

if [[ ${DEPLOYMENT} == "PROD" ]]; then
    sed -i 's/PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
    sed -i "s/#Port 22/Port ${SSH_PORT}/" /etc/ssh/sshd_config
    echo 'AddressFamily inet' | tee -a /etc/ssh/sshd_config
    sed -i 's/#*PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config

    systemctl restart sshd
fi
