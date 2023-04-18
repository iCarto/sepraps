#!/bin/bash

set -euo pipefail

this_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null && pwd)"
# shellcheck source=variables.ini
source "${this_dir}/variables.ini"

echo "deb http://apt.postgresql.org/pub/repos/apt/ ${OS_CODENAME}-pgdg main" >> /etc/apt/sources.list.d/pgdg.list
wget --quiet -O - http://apt.postgresql.org/pub/repos/apt/ACCC4CF8.asc | apt-key add -
apt update -qq

# Use custom locale for cluster initialization
BCK_LANG="${LANG}"
BCK_LC_CTYPE="${LC_CTYPE:-${LANG}}"
BCK_LC_MESSAGES="${LC_MESSAGES:-${LANG}}"
update-locale --reset LANG="${LOCALE}" LC_CTYPE="${LOCALE}" LC_MESSAGES=C

apt install -y "postgresql-${PG_VERSION}" "postgresql-contrib-${PG_VERSION}" "postgresql-server-dev-${PG_VERSION}" "postgresql-${PG_VERSION}-postgis-${POSTGIS_VERSION}"
# apt-get install -y postgresql-${PG_VERSION}-postgis-${POSTGIS_VERSION}-scripts # para instalar topology, tiger, ...
# https://askubuntu.com/questions/117635/how-to-install-suggested-packages-in-apt-get
# `postgis` can recommends other PG_VERSION so to avoid installation this must be done in two steps
apt install -y --no-install-recommends postgis

update-locale --reset LANG="${BCK_LANG}" LC_CTYPE="${BCK_LC_CTYPE}" LC_MESSAGES="${BCK_LC_MESSAGES}"

unset BCK_LANG
unset BCK_LC_CTYPE
unset BCK_LC_MESSAGES

sudo -u postgres psql postgres -c "ALTER USER postgres WITH PASSWORD '${PG_POSTGRES_PASSWD}';"

POSTGRESQL_CONF_FILE="/etc/postgresql/${PG_VERSION}/main/postgresql.conf"

mv "${POSTGRESQL_CONF_FILE}" "${POSTGRESQL_CONF_FILE}.${PG_VERSION}.${TODAY}"
grep -v '^#' "${POSTGRESQL_CONF_FILE}.${PG_VERSION}.${TODAY}" | grep '^[ ]*[a-z0-9]' > "${POSTGRESQL_CONF_FILE}"
grep -v '^#' "${POSTGRESQL_CONF_FILE}.${PG_VERSION}.${TODAY}" | grep '^[ ]*[a-z0-9]' > "${POSTGRESQL_CONF_FILE}.${PG_VERSION}.${TODAY}.no_comments"

mv "/etc/postgresql/${PG_VERSION}/main/pg_hba.conf" "/etc/postgresql/${PG_VERSION}/main/pg_hba.conf.${PG_VERSION}.${TODAY}"
grep -v '^#' "/etc/postgresql/${PG_VERSION}/main/pg_hba.conf.${PG_VERSION}.${TODAY}" | grep '^[ ]*[a-z0-9]' > "/etc/postgresql/${PG_VERSION}/main/pg_hba.conf"
grep -v '^#' "/etc/postgresql/${PG_VERSION}/main/pg_hba.conf.${PG_VERSION}.${TODAY}" | grep '^[ ]*[a-z0-9]' > "/etc/postgresql/${PG_VERSION}/main/pg_hba.conf.${PG_VERSION}.${TODAY}.no_comments"

chown postgres:postgres "/etc/postgresql/${PG_VERSION}/main/pg_hba.conf"
chown postgres:postgres "${POSTGRESQL_CONF_FILE}"
chmod 640 "/etc/postgresql/${PG_VERSION}/main/pg_hba.conf"
chmod 644 "${POSTGRESQL_CONF_FILE}"

chmod a-w "${POSTGRESQL_CONF_FILE}.${PG_VERSION}.${TODAY}"
chmod a-w "${POSTGRESQL_CONF_FILE}.${PG_VERSION}.${TODAY}.no_comments"
chmod a-w "/etc/postgresql/${PG_VERSION}/main/pg_hba.conf.${PG_VERSION}.${TODAY}.no_comments"

sed -i "s/^port[ ]*=[ ]*[0-9]*/port = ${PG_PORT}/" "${POSTGRESQL_CONF_FILE}"
grep -q '^port' "${POSTGRESQL_CONF_FILE}" || echo -e "port = ${PG_PORT}\n" >> "${POSTGRESQL_CONF_FILE}"

# lc_messages = 'C' teniendo en cuenta si existe la línea o no
sed -i "s/lc_messages = .*/lc_messages = 'C'/" "${POSTGRESQL_CONF_FILE}"
grep -q 'lc_messages' "${POSTGRESQL_CONF_FILE}" || echo -e "lc_messages = 'C'\n" >> "${POSTGRESQL_CONF_FILE}"

sed -i "s/log_line_prefix = '\%m \[\%p\] \%q\%u\@\%d '/log_line_prefix = '\%h \%m \[\%p\] \%q\%u\@\%d '/" "${POSTGRESQL_CONF_FILE}"
grep -q 'log_line_prefix' "${POSTGRESQL_CONF_FILE}" || echo -e "log_line_prefix = '%h %m [%p] %q%u@%d '\n" >> "${POSTGRESQL_CONF_FILE}"

# # Usamos logrotate
# sed -i "s/logging_collector = .*/logging_collector = on/" "${POSTGRESQL_CONF_FILE}"
# grep -q 'logging_collector' "${POSTGRESQL_CONF_FILE}" || echo -e "logging_collector = on\n" >> "${POSTGRESQL_CONF_FILE}"

# sed -i "s/log_rotation_age = .*/log_rotation_age = 0/" "${POSTGRESQL_CONF_FILE}"
# grep -q 'log_rotation_age' "${POSTGRESQL_CONF_FILE}" || echo -e "log_rotation_age = 0\n" >> "${POSTGRESQL_CONF_FILE}"

# sed -i "s/log_rotation_size = .*/log_rotation_size = 0/" "${POSTGRESQL_CONF_FILE}"
# grep -q 'log_rotation_size' "${POSTGRESQL_CONF_FILE}" || echo -e "log_rotation_size = 0\n" >>"${POSTGRESQL_CONF_FILE}"

echo '/var/log/postgresql/*.log {
       weekly
       rotate 10
       copytruncate
       delaycompress
       compress
       notifempty
       missingok
       su root root
}
' > /etc/logrotate.d/postgresql-common
chown root:root /etc/logrotate.d/postgresql-common
chmod 644 /etc/logrotate.d/postgresql-common

if ${PG_ALLOW_EXTERNAL_CON}; then
    echo "listen_addresses = '*'" >> "${POSTGRESQL_CONF_FILE}"
    echo "host all all 0.0.0.0/0 scram-sha-256" >> "/etc/postgresql/${PG_VERSION}/main/pg_hba.conf"
fi

# config psql dotfiles
# https://stackoverflow.com/questions/1988249/how-do-i-use-su-to-execute-the-rest-of-the-bash-script-as-that-user
# sudo -u "${DEFAULT_USER}" -H ./config_postgres_dotfiles.sh
cp "${SETTINGS}/postgresql-settings/psqlrc" "${DEFAULT_USER_HOME}"/.psqlrc
chown "${DEFAULT_USER}":"${DEFAULT_USER}" "${DEFAULT_USER_HOME}"/.psqlrc

echo "*:${PG_PORT}:*:postgres:${PG_POSTGRES_PASSWD}" > "${DEFAULT_USER_HOME}"/.pgpass
chown "${DEFAULT_USER}":"${DEFAULT_USER}" "${DEFAULT_USER_HOME}"/.pgpass
chmod 600 "${DEFAULT_USER_HOME}"/.pgpass

systemctl restart postgresql
