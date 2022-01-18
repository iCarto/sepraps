#!/bin/bash

source variables.ini

cp "${SETTINGS}/postgresql-settings/psqlrc" "${DEFAULT_USER_HOME}"/.psqlrc
chown "${DEFAULT_USER}":"${DEFAULT_USER}" "${DEFAULT_USER_HOME}"/.psqlrc
echo "*:${PG_PORT}:*:postgres:${PG_POSTGRES_PASSWD}" > "${DEFAULT_USER_HOME}"/.pgpass
chown "${DEFAULT_USER}":"${DEFAULT_USER}" "${DEFAULT_USER_HOME}"/.pgpass
chmod 600 "${DEFAULT_USER_HOME}"/.pgpass
