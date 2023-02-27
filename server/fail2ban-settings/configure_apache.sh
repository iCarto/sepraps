#!/bin/bash

LOG_APACHE_ERROR="/var/log/apache2/*error.log"
LOG_APACHE_ACCESS="/var/log/apache2/*access.log"
JAIL_APACHE="/etc/fail2ban/jail.d/apache.local"

apache_configuration() {
    ## Generate Apache configuration

    if [[ "$1" == "APACHE_AUTH" ]]; then
        echo -e "[apache-auth]
        enabled=true
        logpath=${LOG_APACHE_ERROR}\n"  | sed 's/^[\t ]*//' >> "${JAIL_APACHE}"
    fi

    if [[ "$1" == "APACHE_BADBOTS" ]]; then
        echo -e "[apache-badbots]
        enabled=true
        logpath=${LOG_APACHE_ACCESS}\n"  | sed 's/^[\t ]*//' >> "${JAIL_APACHE}"
    fi

    if [[  "$1" == "APACHE_BOTSEARCH" ]]; then
        echo -e "[apache-botsearch]
        enabled=true
        logpath=${LOG_APACHE_ERROR}\n"  | sed 's/^[\t ]*//' >> "${JAIL_APACHE}"
    fi

    if [[ "$1" == "APACHE_FAKEGOOGLEBOT" ]]; then
        echo -e "[apache-fakegooglebot]
        enabled=true
        logpath=${LOG_APACHE_ACCESS}\n"  | sed 's/^[\t ]*//' >> "${JAIL_APACHE}"
    fi

    if [[ "$1" == "APACHE_MODSECURITY" ]]; then
        echo -e "[apache-modsecurity]
        enabled=true
        logpath=${LOG_APACHE_ERROR}\n"  | sed 's/^[\t ]*//' >> "${JAIL_APACHE}"
    fi

    if [[ "$1" == "APACHE_NOHOME" ]]; then
        echo -e "[apache-nohome]
        enabled=true
        logpath=${LOG_APACHE_ERROR}\n"  | sed 's/^[\t ]*//' >> "${JAIL_APACHE}"
    fi

    if [[ "$1" == "APACHE_NOSCRIPT" ]]; then
        echo -e "[apache-noscript]
        enabled=true
        logpath=${LOG_APACHE_ERROR}\n"  | sed 's/^[\t ]*//' >> "${JAIL_APACHE}"
    fi

    if [[ "$1" == "APACHE_OVERFLOWS" ]]; then
        echo -e "[apache-overflows]
        enabled=true
        logpath=${LOG_APACHE_ERROR}\n"  | sed 's/^[\t ]*//' >> "${JAIL_APACHE}"
    fi

    if [[ "$1" == "APACHE_PASS" ]]; then
        echo -e "
        [apache-pass]
        enabled=true
        logpath=${LOG_APACHE_ERROR}\n"  | sed 's/^[\t ]*//' >> "${JAIL_APACHE}"
    fi

    if [[ "$1" == "APACHE_SHELLSHOCK" ]]; then
        echo -e "[apache-shellshock]
        enabled=true
        logpath=${LOG_APACHE_ERROR}\n"  | sed 's/^[\t ]*//' >> "${JAIL_APACHE}"
    fi

}
