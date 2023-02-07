#!/bin/bash

reset_configuration() {
    # Removes files generated by previous configuration attempts
    if [[ -f "${JAIL_DEF}.conf" ]]; then
        rm "${JAIL_DEF}.conf"
        touch "${JAIL_DEF}.conf"
    else
        echo "Error: ${JAIL_DEF}.conf doesn't exist. Make sure to edit JAIL_DEF value in \
              fail2ban-settings/fail2ban.conf to match your distribution"
        exit 1
    fi

    if [[ -f "$JAIL_SSH" ]]; then
        rm "$JAIL_SSH"
    fi

    if [[ -f "$JAIL_APACHE" ]]; then
        rm "$JAIL_APACHE"
    fi

    if [[ -f "$JAIL_REDMINE" ]]; then
        rm "$JAIL_REDMINE"
    fi 

    if [[ -f "$JAIL_WORDPRESS" ]]; then
        rm "$JAIL_WORDPRESS"
    fi 

    if [[ -f "$JAIL_POSTGRESQL" ]]; then
        rm "$JAIL_POSTGRESQL"
    fi 
}

default_configuration() {
    # The script bypasses jail.conf/jail.local configuration creating custom configuration files inside the jail.d for default
    # options like mail, actions, ban policy
    reset_configuration

    # Generate local configuration, only to avoid config changes on service updates
    cp "$CFG_F2B.conf" "$CFG_F2B.local"

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
    
    echo -e "${config}" | sed 's/^[\t ]*//' > "${JAIL_DEF}.local"
}

sshd_configuration() {
    # Generate SSH configuration
    local config="[sshd]
        enabled=true
        logpath=${LOG_SSHD}\n"
    echo -e "${config}" | sed 's/^[\t ]*//' > "${JAIL_SSH}"
}

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
    echo -e "${config}" | sed 's/^[\t ]*//' > "${JAIL_REDMINE}"
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
    echo -e "${config}" | sed 's/^[\t ]*//' > "${JAIL_WORDPRESS}"
}

postgresql_configuration(){
    # Copy postgresql regex filter to filter.d folder
    cp "${this_dir}/${FILTER_POSTGRESQL_SOURCE}" "${F2B_FILTER_DIR}"

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
    port = 5432
    logpath = ${LOG_POSTGRESQL}\n"
    echo -e "${config}" | sed 's/^[\t ]*//' > "${JAIL_POSTGRESQL}"
}

