#!/bin/bash

source variables.ini

apt install ufw

ufw default deny incoming
ufw default allow outgoing

if [[ ${DEPLOYMENT} == "DEV" ]]; then
    ufw allow ssh
else
    ufw delete deny ssh
    ufw allow "${SSH_PORT}/tcp"
fi

if "${PG_ALLOW_EXTERNAL_CON}"; then
    ufw allow "${PG_PORT}/tcp"
fi

ufw allow http
ufw allow https
ufw enable
