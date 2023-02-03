#!/bin/bash

# set -e: stops the script on error
# set -u: stops the script on unset variables
# set -o pipefail:  fail the whole pipeline on first error
set -euo pipefail
this_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null && pwd)"

# Load script configuration
# shellcheck disable=SC1091
source "${this_dir}/fail2ban-settings/fail2ban.ini"

# Import script configuration funtions 
# shellcheck disable=SC1091
source "${this_dir}/fail2ban-settings/configure.sh"

#
# Install fail2ban
apt -y install fail2ban

# Configure default options
default_configuration

# Configure enabled services
for item in "${ACTIVE_JAILS[@]}"
do
    case $item in
    SSHD)
        sshd_configuration
    ;;
    APACHE_*)
        apache_configuration "$item"
    ;;
    REDMINE)
        redmine_configuration
    ;;
    WORDPRESS)
        wordpress_configuration
    ;;
    POSTGRESQL)
        postgresql_configuration
    ;;
    *)
        echo "Error: Configuration action fot $item not defined"
    ;;
    esac
done

# Restart service
systemctl enable fail2ban
systemctl start fail2ban
fail2ban-client reload