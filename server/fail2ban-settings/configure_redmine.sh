#!/bin/bash
source variables.ini
LOG_REDMINE_PRODUCTION="/home/redmine/remine-5.0.4/log/production.log"
JAIL_REDMINE="${F2B_PATH}/jail.d/redmine.local"
FILTER_REDMINE_SOURCE="fail2ban-settings/filters/redmine.conf"

redmine_configuration() {
    # Copy redmine regex filter to filter.d folder
    # https://www.redmine.org/projects/redmine/wiki/HowTo_Configure_Fail2ban_For_Redmine
    cp "${this_dir}/${FILTER_REDMINE_SOURCE}" "${F2B_PATH}/filter.d"

    # Generate redmine configuration
    local config="[redmine]
        enabled  = true
        filter   = redmine
        port     = 80,443
        logpath=${LOG_REDMINE_PRODUCTION}\n"
    echo -e "${config}" | sed 's/^[\t ]*//' > "${JAIL_REDMINE}"
}
