#!/bin/bash

source variables.ini

from_apt() {
    # https://devops.profitbricks.com/tutorials/install-and-configure-mod_wsgi-on-ubuntu-1604-1/
    apt-get install -y apache2 apache2-utils libexpat1 ssl-cert python3 libapache2-mod-wsgi-py3
}

from_source() {
    # mod_wsgi should be compiled with the same version that the python to be
    # used. pip insall mod_wsgi compiles it, the we move it to apache folders
    # this can be improved
    # https://github.com/GrahamDumpleton/mod_wsgi
    apt-get install -y apache2 apache2-dev apache2-utils libexpat1 ssl-cert
    sudo -u "${DEFAULT_USER}" -H -i "/home/${DEFAULT_USER}/.virtualenvs/${PROJECT_NAME}/bin/pip" install mod_wsgi
    "/home/${DEFAULT_USER}/.virtualenvs/${PROJECT_NAME}/bin/python" "/home/${DEFAULT_USER}/.virtualenvs/${PROJECT_NAME}/bin/mod_wsgi-express" install-module
}

if [[ "${INSTALL_PYTHON_FROM}" == "apt" ]]; then
    from_apt
elif [[ "${INSTALL_PYTHON_FROM}" == "source" ]]; then
    from_source
elif [[ "${INSTALL_PYTHON_FROM}" == "pyenv" ]]; then
    from_source
else
    echo "Error de parámetro" && exit 1
fi

usermod -a -G www-data "${DEFAULT_USER}"

mkdir -p "${WWW_PATH}"
chown -R "${DEFAULT_USER}":www-data "${WWW_PATH}"

mkdir -p "${WWW_MEDIA_PATH}"
chown -R "${DEFAULT_USER}":www-data "${WWW_MEDIA_PATH}"

# En producción clonar repo en "${WWW_PATH}"

a2enmod deflate
a2enmod ssl
a2dissite 000-default

cp "${SETTINGS}/apache-settings/project.conf" "/etc/apache2/sites-available/${PROJECT_NAME}.conf"
sed -i "s%__DEFAULT_USER%${DEFAULT_USER}%" "/etc/apache2/sites-available/${PROJECT_NAME}.conf"
sed -i "s%__PROJECT_NAME%${PROJECT_NAME}%" "/etc/apache2/sites-available/${PROJECT_NAME}.conf"
sed -i "s%__WWW_PATH%${WWW_PATH}%" "/etc/apache2/sites-available/${PROJECT_NAME}.conf"
sed -i "s%__VIRTUALENV_PATH%${VIRTUALENV_PATH}%" "/etc/apache2/sites-available/${PROJECT_NAME}.conf"
a2ensite "${PROJECT_NAME}"

cp "${SETTINGS}/apache-settings/http2https.conf" "/etc/apache2/sites-available/"
cp "${SETTINGS}/apache-settings/reverseproxy.conf" "/etc/apache2/sites-available/"

./restart_apache.sh
