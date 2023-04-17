#!/bin/bash

JAIL_SSH="/etc/fail2ban/jail.d/sshd.local"
LOG_SSHD="/var/log/auth.log"

sshd_configuration() {
    # Generate SSH configuration
    local config="[sshd]
        enabled=true
        logpath=${LOG_SSHD}\n"
    echo -e "${config}" | sed 's/^[\t ]*//' > "${JAIL_SSH}"
}
