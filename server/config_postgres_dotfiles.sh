#!/bin/bash

source variables.ini

cp "${SETTINGS}/postgresql-settings/psqlrc" ~/.psqlrc
chown "${DEFAULT_USER}":"${DEFAULT_USER}" ~/.psqlrc
echo "*:${PG_PORT}:*:postgres:${PG_POSTGRES_PASSWD}" > ~/.pgpass
chown "${DEFAULT_USER}":"${DEFAULT_USER}" ~/.pgpass
chmod 600 ~/.pgpass
