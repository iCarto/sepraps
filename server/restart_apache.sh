#!/bin/bash

OS_CODENAME=$(lsb_release -cs)

# /etc/init.d/apache2 restart
if [[ "${OS_CODENAME}" == "precise" ]]; then
    service apache2 reload
else
    systemctl restart apache2
fi
