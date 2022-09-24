#!/bin/bash

set -e

this_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null && pwd)"

# shellcheck source=variables.ini
source "${this_dir}/variables.ini"

# https://letsencrypt.org/getting-started/
# https://letsencrypt.org/docs/client-options/
# https://letsencrypt.org/how-it-works/
# https://letsencrypt.org/docs/challenge-types/
# https://certbot.eff.org/
# https://certbot.eff.org/docs/using.html

# TODO
# https://letsencrypt.org/docs/expiration-emails/
# https://github.com/plinss/acmebot
# https://docs.ansible.com/ansible/latest/modules/acme_certificate_module.html
# https://github.com/acmesh-official/acme.sh

# stretch tanto en la oficial como en backports mete cerbot 0.28.0 en la 0.29
# hay un cambio en los permisos. Revisar.
# https://certbot.eff.org/docs/using.html#where-are-my-certificates

# Sitio recomendado para revisar que el certificado está bien instalado:
# https://www.ssllabs.com/ssltest/
# https://certbot.eff.org/help#debug

if [[ "${DEPLOYMENT}" != "PROD" ]]; then
    # Nothing to do if it's not PROD
    exit 0
fi

if [[ -z "${SERVER_RDNS}" ]]; then
    echo "El RDNS no ha sido fijado. No se puede instalar let's encrypt"
fi

if [[ "${OS_CODENAME}" == "stretch" ]]; then
    echo "install_letsencrypt. SO es stretch"
elif [[ "${OS_CODENAME}" == "bionic" ]] || [[ "${OS_CODENAME}" == "xenial" ]]; then
    echo "install_letsencrypt. SO es bionic o xenial"
    apt update
    apt install -y software-properties-common
    add-apt-repository -y universe
    add-apt-repository -y ppa:certbot/certbot
    apt update
else
    echo "install_letsencrypt. Script no preparado para este SO"
    exit 1
fi

apt install -y certbot python-certbot-apache

# A pesar de permitirle auto-configurar apache hay que revisar y hacer
# cambios a mano
certbot run -n --apache --hsts --uir --redirect --email=dev@icarto.es --no-eff-email --agree-tos -d "${SERVER_RDNS}"

# Por defecto hace la comprobación de si hay que renovar dos veces al día
certbot renew --dry-run # Para chequear que la renovación automática funciona

# certbot certificates # para obtener información de los certs instalados

# Include /etc/letsencrypt/options-ssl-apache.conf
# Header always set Strict-Transport-Security "max-age=31536000"
# Header always set Content-Security-Policy upgrade-insecure-requests
