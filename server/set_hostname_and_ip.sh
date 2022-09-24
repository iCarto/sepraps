#!/bin/bash

# set -e: stops the script on error
# set -u: stops the script on unset variables
# set -o pipefail:  fail the whole pipeline on first error
set -euo pipefail

this_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null && pwd)"

# shellcheck source=variables.ini
source "${this_dir}/variables.ini"

if [[ "${DEPLOYMENT}" != "PROD" ]]; then
    # Nothing to do if it's not PROD
    exit 0
fi

# https://www.ipify.org/ is a good alternative to ipinfo.io
IP=$(curl -s ipinfo.io/ip)
echo "Public IP is: ${IP}"
hostnamectl set-hostname "${MY_HOSTNAME}"
echo -e "\n${IP}\t${MY_HOSTNAME}\n" >> /etc/hosts
