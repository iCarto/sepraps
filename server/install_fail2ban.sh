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
if [[ "${SSHD_ENABLE}" == "true" ]]; then
    sshd_configuration
fi

if [[ "${APACHE_AUTH_ENABLE}" == "true" ]] || 
   [[ "${APACHE_BADBOTS_ENABLE}" == "true" ]] || 
   [[ "${APACHE_BOTSEARCH_ENABLE}" == "true" ]] || 
   [[ "${APACHE_FAKEGOOGLEBOT_ENABLE}" == "true" ]] || 
   [[ "${APACHE_MODSECURITY_ENABLE}" == "true" ]] || 
   [[ "${APACHE_NOHOME_ENABLE}" == "true" ]] || 
   [[ "${APACHE_NOSCRIPT_ENABLE}" == "true" ]] || 
   [[ "${APACHE_OVERFLOWS_ENABLE}" == "true" ]]|| 
   [[ "${APACHE_PASS_ENABLE}" == "true" ]] ||
   [[ "${APACHE_SHELLSHOCK_ENABLE}" == "true" ]] ; then
    apache_configuration
fi

if [[ "${REDMINE_ENABLE}" == "true" ]]; then
    redmine_configuration
fi

if [[ "${WORDPRESS_ENABLE}" == "true" ]]; then
    wordpress_configuration
fi

if [[ "${POSTGRESQL_ENABLE}" == "true" ]]; then
    postgresql_configuration
fi

# Restart service
systemctl enable fail2ban
systemctl start fail2ban
fail2ban-client reload