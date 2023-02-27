#!/bin/bash
source variables.ini
JAIL_POSTGRESQL="/etc/fail2ban/jail.d/postgresql.local"
LOG_POSTGRESQL="/var/log/postgresql/postgresql-${PG_VERSION}-main.log"
CFG_POSTGRESQL="/etc/postgresql/${PG_VERSION}/main/postgresql.conf"
FILTER_POSTGRESQL_SOURCE="fail2ban-settings/filters/postgresql.conf"

postgresql_configuration(){
    # Copy postgresql regex filter to filter.d folder

    cp "./${FILTER_POSTGRESQL_SOURCE}" "/etc/fail2ban/filter.d"

    if [[ -f "${CFG_POSTGRESQL}" ]]; then
        # If PostgreSQL log configuration does'nt include host info exit intallation
        if ! grep -q "log_line_prefix = '\%h \%m \[\%p\] \%q\%u\@\%d '" "${CFG_POSTGRESQL}"; then
            echo "Error in log format: You need to change the value of the variable 'log_line_prefix' in ${CFG_POSTGRESQL} to '\%h \%m \[\%p\] \%q\%u\@\%d '"
            exit 1
        fi
    else
        echo "Error: ${CFG_POSTGRESQL} doesn't exist. Make sure to edit CFG_POSTGRESQL value in
        fail2ban-settings/fail2ban.conf to match your installation"
        exit 1
    fi

    # Generate postgresql configuration
    local config="[postgresql]
    enabled = true
    filter = postgresql
    port = ${PG_PORT}
    logpath = ${LOG_POSTGRESQL}\n"
    echo -e "${config}" | sed 's/^[\t ]*//' > "${JAIL_POSTGRESQL}"
}

