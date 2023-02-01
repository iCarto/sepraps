#!/bin/bash

# set -e: stops the script on error
# set -u: stops the script on unset variables
# set -o pipefail:  fail the whole pipeline on first error
set -euo pipefail

this_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null && pwd)"
# shellcheck disable=SC1091
source "${this_dir}/fail2ban-settings/fail2ban.conf"

reset_configuration() {
    if [[ -f "${FILE_DEF}.conf" ]]; then
        rm "${FILE_DEF}.conf"
        touch "${FILE_DEF}.conf"
    else
        echo "Error: ${FILE_DEF}.conf doesn't exist. Make sure to edit FILE_DEF value in \
              fail2ban-settings/fail2ban.conf to match your distribution"
        exit 1
    fi

    if [[ -f "$FILE_SSH" ]]; then
        rm "$FILE_SSH"
    fi

    if [[ -f "$FILE_APACHE" ]]; then
        rm "$FILE_APACHE"
    fi

    if [[ -f "$FILE_REDMINE" ]]; then
        rm "$FILE_REDMINE"
    fi 
}

default_configuration() {
    # The script bypasses jail.conf/jail.local configuration creating custom configuration files inside the jail.d for default
    # options like mail, actions, ban policy
    reset_configuration

    # Generate local configuration, only to avoid config changes on service updates
    cp "$FILE_F2B.conf" "$FILE_F2B.local"

    # Write default configuration
    local config="[DEFAULT]
        ignoreip=127.0.0.1/8 ${IGNORE}\n
        mta=${MAIL_MTA}
        sender=${MAIL_SENDER}
        destemail=${MAIL_DESTEMAIL}\n
        bantime=${DEFAULT_BANTIME}
        maxretry=${DEFAULT_MAXRETRY}
        findtime=${DEFAULT_FINDTIME}
        action=${DEFAULT_ACTION}\n"
    
    echo -e "${config}" | sed 's/^[\t ]*//' > "${FILE_DEF}.local"
}

sshd_configuration() {
    # Generate SSH configuration
    local config="[sshd]
        enabled=true
        logpath=${LOG_SSHD}\n"
    echo -e "${config}" | sed 's/^[\t ]*//' > "${FILE_SSH}"
}

apache_configuration() {
    # Generate Apache configuration
    local config=""
    if "${APACHE_AUTH_ENABLE}"; then
        config="[apache-auth]
        enabled=true
        logpath=${LOG_APACHE_ERROR}\n"
    fi

    if "${APACHE_BADBOTS_ENABLE}"; then
        config+="[apache-badbots]
        enabled=true
        logpath=${LOG_APACHE_ACCESS}\n"
    fi

    if "${APACHE_BOTSEARCH_ENABLE}"; then
        config+="[apache-botsearch]
        enabled=true
        logpath=${LOG_APACHE_ERROR}\n"
    fi

    if "${APACHE_FAKEGOOGLEBOT_ENABLE}"; then
        config+="[apache-fakegooglebot]
        enabled=true
        logpath=${LOG_APACHE_ACCESS}\n"
    fi

    if "${APACHE_MODSECURITY_ENABLE}"; then
        config+="[apache-modsecurity]
        enabled=true
        logpath=${LOG_APACHE_ERROR}\n"
    fi

    if "${APACHE_NOHOME_ENABLE}"; then
        config+="[apache-nohome]
        enabled=true
        logpath=${LOG_APACHE_ERROR}\n"
    fi

    if "${APACHE_NOSCRIPT_ENABLE}"; then
        config+="[apache-noscript]
        enabled=true
        logpath=${LOG_APACHE_ERROR}\n"
    fi

    if "${APACHE_OVERFLOWS_ENABLE}"; then
        config+="[apache-overflows]
        enabled=true
        logpath=${LOG_APACHE_ERROR}\n"
    fi

    if "${APACHE_PASS_ENABLE}"; then
        config+="
        [apache-pass]
        enabled=true
        logpath=${LOG_APACHE_ERROR}\n"
    fi

    if "${APACHE_SHELLSHOCK_ENABLE}"; then
        config+="[apache-shellshock]
        enabled=true
        logpath=${LOG_APACHE_ERROR}\n"
    fi
    echo -e "${config}" | sed 's/^[\t ]*//' > "${FILE_APACHE}"
}

redmine_configuration() {
    # Copy redmine regex filter to filter.d folder
    # https://www.redmine.org/projects/redmine/wiki/HowTo_Configure_Fail2ban_For_Redmine
    cp "${this_dir}/${FILTER_REDMINE_SOURCE}" "${F2B_FILTER_DIR}"

    # Generate redmine configuration
    local config="[redmine]
        enabled  = true
        filter   = redmine
        port     = 80,443
        logpath=${LOG_REDMINE_PRODUCTION}\n"
    echo -e "${config}" | sed 's/^[\t ]*//' > "${FILE_REDMINE}"
}

wordpress_configuration(){
    # Copy wordpress regex filter to filter.d folder
    # https://help.clouding.io/hc/es/articles/360019516239-C%C3%B3mo-a%C3%B1adir-una-jail-en-Fail2ban-para-WordPress
    cp "${this_dir}/${FILTER_WORDPRESS_SOURCE}" "${F2B_FILTER_DIR}"
    
    # Generate wordpress configuration
    local config="[wordpress]
    enabled = true
    filter = wordpress
    port = http,https
    logpath = ${LOG_APACHE_ERROR}\n"
    echo -e "${config}" | sed 's/^[\t ]*//' > "${FILE_WORDPRESS}"
}

postgresql_configuration(){
    # Copy redmine regex filter to filter.d folder
    cp "${this_dir}/${FILTER_POSTGRESQL_SOURCE}" "${F2B_FILTER_DIR}"

    # https://talk.plesk.com/threads/howto-secure-a-standard-postgres-port-with-fail2ban.355984/
    # you'll need to modify /etc/postgresql/<VERSION>/main/postgresql.conf
    # to add host info to the logfile
    if [[ -f "${LOG_POSTGRESQL}" ]]; then
        sed "s/log_line_prefix = '\%m \[\%p\] \%q\%u\@\%d '/log_line_prefix = '\%h \%m \[\%p\] \%q\%u\@\%d '/" ${LOG_POSTGRESQL}    
    else
        echo "Error: ${LOG_POSTGRESQL} doesn't exist. Make sure to edit LOG_POSTGRESQL value in \
              fail2ban-settings/fail2ban.conf to match your installation"
        exit 1
    fi

    # Generate postgresql configuration
    local config="[postgresql]
    enabled = true
    filter = postgresql
    port = 5432
    logpath = ${LOG_POSTGRESQL}\n"
    echo -e "${config}" | sed 's/^[\t ]*//' > "${FILE_POSTGRESQL}"
}



# Install fail2ban
apt -y install fail2ban

# Configure services
default_configuration

if [[ ${SSHD_ENABLE} ]]; then
    sshd_configuration
fi

if [[ ${APACHE_AUTH_ENABLE} || 
      ${APACHE_BADBOTS_ENABLE} || 
      ${APACHE_BOTSEARCH_ENABLE} || 
      ${APACHE_FAKEGOOGLEBOT_ENABLE} || 
      ${APACHE_MODSECURITY_ENABLE} || 
      ${APACHE_NOHOME_ENABLE} || 
      ${APACHE_NOSCRIPT_ENABLE} || 
      ${APACHE_OVERFLOWS_ENABLE} || 
      ${APACHE_PASS_ENABLE} ||
      ${APACHE_SHELLSHOCK_ENABLE} ]] ; then
    apache_configuration
fi

if [[ ${REDMINE_ENABLE} ]]; then
    redmine_configuration
fi

if [[ ${WORDPRESS_ENABLE} ]]; then
    wordpress_configuration
fi

if [[ ${POSTGRESQL_ENABLE} ]]; then
    postgresql_configuration
fi

# Restart service
systemctl enable fail2ban
systemctl start fail2ban
