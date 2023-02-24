#!/bin/bash
source variables.ini

LOG_APACHE_ERROR="/var/log/apache2/*error.log"
JAIL_WORDPRESS="${F2B_PATH}/jail.d/wordpress.local"
FILTER_WORDPRESS_SOURCE="fail2ban-settings/filters/wordpress.conf"

wordpress_configuration(){
    # Copy wordpress regex filter to filter.d folder
    # https://help.clouding.io/hc/es/articles/360019516239-C%C3%B3mo-a%C3%B1adir-una-jail-en-Fail2ban-para-WordPress
    cp "${this_dir}/${FILTER_WORDPRESS_SOURCE}" "${F2B_PATH}/filter.d"

    # Generate wordpress configuration
    local config="[wordpress]
    enabled = true
    filter = wordpress
    port = http,https
    logpath = ${LOG_APACHE_ERROR}\n"
    echo -e "${config}" | sed 's/^[\t ]*//' > "${JAIL_WORDPRESS}"
}
