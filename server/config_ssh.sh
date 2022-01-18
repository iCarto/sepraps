#!/bin/bash

source variables.ini

sed -e '/SendEnv/ s/^#*/#/' -i /etc/ssh/ssh_config
sed -e '/AcceptEnv/ s/^#*/#/' -i /etc/ssh/sshd_config

if [[ ${DEPLOYMENT} == "PROD" ]]; then
    sed -i "s/#Port 22/Port ${SSH_PORT}/" /etc/ssh/sshd_config
    systemctl restart sshd
fi
