#!/bin/bash

this_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null && pwd)"

# shellcheck source=variables.ini
source "${this_dir}"/variables.ini

mkdir -p /etc/gunicorn/
if [[ -f /etc/gunicorn/gunicorn.conf.py ]]; then
    cp /etc/gunicorn/gunicorn.conf.py "/etc/gunicorn/gunicorn.conf.py.${TODAY}"
fi

if [[ -f /etc/gunicorn/.env ]]; then
    cp /etc/gunicorn/.env "/etc/gunicorn/.env.${TODAY}"
fi

if [[ -f "/etc/systemd/system/${PROJECT_NAME}.service" ]]; then
    cp "/etc/systemd/system/${PROJECT_NAME}.service" "/etc/gunicorn/${PROJECT_NAME}.service.${TODAY}"
fi

echo "
wsgi_app='${PROJECT_NAME}.back.wsgi'
bind = '0.0.0.0:${GUNICORN_PORT}'
pythonpath='${WWW_PATH}/venv/lib/python$(echo "${PYTHON_VERSION}" | grep -Po '\d+.\d+')/site-packages/${PROJECT_NAME}'

workers = 2
daemon = False # keep it to False when launching from systemd

accesslog = '/var/log/gunicorn/gunicorn.access.log'
errorlog = '/var/log/gunicorn/gunicorn.error.log'
capture_output = True
loglevel = 'info'
" > /etc/gunicorn/gunicorn.conf.py

# TODO: Debería llamar a echo_env_back.sh pero no puedo llamar a scripts desde server sin más.
echo "
DEBUG=False
SECRET_KEY=${SECRET_KEY}
DATABASE_URL=postgis://${PG_OWNER_USER}:${PG_OWNER_PASSWD}@localhost:${PG_PORT}/${DBNAME}
ALLOWED_HOSTS=${ALLOWED_HOSTS}
HTTPS=True
DATABASE_CONTROL_CHANGES_MODE=sqitch
SENTRY_DSN=
MEDIA_ROOT=${WWW_MEDIA_PATH}
ACCESS_TOKEN_LIFETIME_SECONDS=300
REFRESH_TOKEN_LIFETIME_SECONDS=50400
" > /etc/gunicorn/.env

echo "
[Unit]
Description=${PROJECT_NAME} Gunicorn Service
After=network.target

[Service]
PermissionsStartOnly=true
User=${DEFAULT_USER}
Group=${DEFAULT_USER}
# Hadled with pythonpath in gunicorn.conf.py
# WorkingDirectory=${WWW_PATH}
Environment='LANG=${LOCALE}'
Environment='LC_MESSAGES=en_US.utf8'
Environment='PYTHONIOENCODING=UTF-8'
EnvironmentFile=/etc/gunicorn/.env
ExecStartPre=/bin/mkdir -p /var/log/gunicorn
ExecStartPre=/bin/chown -R ${DEFAULT_USER}:${DEFAULT_USER} /var/log/gunicorn
ExecStart=${WWW_PATH}/venv/bin/gunicorn -c /etc/gunicorn/gunicorn.conf.py
ExecReload=/bin/kill -s HUP \$MAINPID
PrivateTmp=true

[Install]
WantedBy=multi-user.target
" > "/etc/systemd/system/${PROJECT_NAME}.service"

echo '/var/log/gunicorn/*.log {
       weekly
       rotate 10
       copytruncate
       delaycompress
       compress
       notifempty
       missingok
       su root root
}
' > /etc/logrotate.d/gunicorn
chown -R root:root /etc/logrotate.d/gunicorn
chmod -R 644 /etc/logrotate.d/gunicorn

chmod 644 "/etc/systemd/system/${PROJECT_NAME}.service"
systemctl daemon-reload
systemctl enable "${PROJECT_NAME}.service"
systemctl restart "${PROJECT_NAME}.service"
