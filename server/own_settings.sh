#!/bin/bash

source variables.ini

cd /vagrant/server || exit 1

sudo -u postgres createdb "${DBNAME}"

# sudo -u postgres psql -f "${SETTINGS}/own-settings/database_roles.sql"

# cp ${SETTINGS}/own-settings/pg_hba.conf /etc/postgresql/${PG_VERSION}/main/
# cp ${SETTINGS}/own-settings/postgresql.conf /etc/postgresql/${PG_VERSION}/main/
# chown postgres:postgres /etc/postgresql/${PG_VERSION}/main/pg_hba.conf
# chown postgres:postgres /etc/postgresql/${PG_VERSION}/main/postgresql.conf
# chmod 640 /etc/postgresql/${PG_VERSION}/main/pg_hba.conf
# chmod 644 /etc/postgresql/${PG_VERSION}/main/postgresql.conf
#
# systemctl restart postgresql

# if [[ ${ENTORNO} == "PROD" ]]; then
#     apt-get install anacron
#     cp "${SETTINGS}/other-settings/monthly_tasks" /etc/cron.daily/
#     chmod a+x /etc/cron.daily/monthly_tasks
#     chown root:root /etc/cron.daily/monthly_tasks
# fi
