#!/bin/bash
source variables.ini
LOG_REDMINE_PRODUCTION="/home/redmine/remine-5.0.4/log/production.log"
JAIL_REDMINE="/etc/fail2ban/jail.d/redmine.local"
FILTER_REDMINE_SOURCE="fail2ban-settings/filters/redmine.conf"

redmine_configuration() {
    # Copy redmine regex filter to filter.d folder
    # https://www.redmine.org/projects/redmine/wiki/HowTo_Configure_Fail2ban_For_Redmine
    cp "./${FILTER_REDMINE_SOURCE}" "/etc/fail2ban/filter.d"

    # Generate redmine configuration
    local config="[redmine]
        enabled  = true
        filter   = redmine
        port     = 80,443
        logpath=${LOG_REDMINE_PRODUCTION}\n"
    echo -e "${config}" | sed 's/^[\t ]*//' > "${JAIL_REDMINE}"
}
