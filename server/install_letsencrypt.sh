#!/bin/bash

set -e

this_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null && pwd)"

# shellcheck source=variables.ini
source "${this_dir}/variables.ini"

if [[ "${DEPLOYMENT}" != "PROD" ]]; then
    # Nothing to do if it's not PROD
    exit 0
fi

if [[ -z "${SERVER_RDNS}" ]]; then
    echo "El RDNS no ha sido fijado. No se puede instalar let's encrypt"
fi

# Include /etc/letsencrypt/options-ssl-apache.conf
# Header always set Strict-Transport-Security "max-age=31536000"
# Header always set Content-Security-Policy upgrade-insecure-requests

apt purge -y certbot
apt install -y snapd
snap install core
snap refresh core
snap install --classic certbot
ln -s /snap/bin/certbot /usr/bin/certbot

# A pesar de permitirle auto-configurar apache hay que revisar y hacer
# cambios a mano
certbot run -n --apache --hsts --uir --redirect --email=dev@icarto.es --no-eff-email --agree-tos -d "${SERVER_RDNS}"

# Por defecto hace la comprobación de si hay que renovar dos veces al día
certbot renew --dry-run # Para chequear que la renovación automática funciona

a2ensite http2https
