#!/bin/bash

# source variables.ini

# sudo -u postgres createdb "${DBNAME}"

# if [[ "${DEPLOYMENT}" == "PROD" ]]; then
#     # Set fixed ip in prod
#     cp "${SETTINGS}/own-settings/00-installer-config.yaml" /etc/netplan/00-installer-config.yaml
# fi

# sudo -u postgres psql -f "${SETTINGS}/own-settings/database_roles.sql"

# cp ${SETTINGS}/own-settings/pg_hba.conf /etc/postgresql/${PG_VERSION}/main/
# cp ${SETTINGS}/own-settings/postgresql.conf /etc/postgresql/${PG_VERSION}/main/
# chown postgres:postgres /etc/postgresql/${PG_VERSION}/main/pg_hba.conf
# chown postgres:postgres /etc/postgresql/${PG_VERSION}/main/postgresql.conf
# chmod 640 /etc/postgresql/${PG_VERSION}/main/pg_hba.conf
# chmod 644 /etc/postgresql/${PG_VERSION}/main/postgresql.conf
#
# systemctl restart postgresql

# if [[ ${DEPLOYMENT} == "PROD" ]]; then
#     apt-get install anacron
#     cp "${SETTINGS}/other-settings/monthly_tasks" /etc/cron.daily/
#     chmod a+x /etc/cron.daily/monthly_tasks
#     chown root:root /etc/cron.daily/monthly_tasks
# fi
