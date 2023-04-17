#!/bin/bash

set -e

######################
# SET THIS VARIABLES #
######################

# Create a deploy token, and fill MY_REPO with the full url including the token
# or preconfigure an ssh key and use it
export MY_REPO=''

# A new user will be created, usually the same name as the PROJECT_NAME
export DEFAULT_USER=''

# Password for the new user
export DEFAULT_USER_PASSWORD=''

# Authorized public keys
SSH_PUB_KEYS=''

# Database password for postgres user
export PG_POSTGRES_PASSWD=''

# https://docs.djangoproject.com/en/4.1/ref/settings/#std-setting-SECRET_KEY
# Se puede generar con: base64 /dev/urandom | head -c50
export SECRET_KEY=

# https://docs.djangoproject.com/en/4.1/ref/settings/#allowed-hosts
# Se suele rellenara con la ip y el dominio desde el que se servirá la
# aplicación. Lista separada por comas, sin espacios. Por ejemplo
# ALLOWED_HOSTS=168.0.1.9,.subdomain.domain.com
export ALLOWED_HOSTS=

########################
# Variables opcionales #
########################

# Ruta al .tgz instalable mediante pip que contiene la aplicación, en caso
# de existir
# DEPLOY_FILE=/tmp/221115_project_deploy/project-0.0.1.tar.gz
export DEPLOY_FILE=

# Ruta al dump de la base de datos que se restaurara, en caso de existir
# DUMP_FILE=/tmp/221115_project_deploy//221115_project.dump
export DUMP_FILE=

# Ruta a una .tar.gz que contiene la carpeta "media" (ficheros modificables por usuarios
# tipo fotos) en caso de existir
# MEDIA_FILE=/tmp/221115_project_deploy/221115_media_project.tar.gz
export MEDIA_FILE=

# Puerto en que gunicorn servirá la aplicación web
# export GUNICORN_PORT=8000
# export SSH_PORT=10000
# export MY_HOSTNAME=
# export PG_PORT=5432
# export SERVER_RDNS=

# If postgres should only listen on localhost or also for external connection
# PG_ALLOW_EXTERNAL_CON=false

#############################
# END OF SET THIS VARIABLES #
#############################

# starts_with_https() {
#    [[ "${1}" =~ ^git.* ]]
# }
# if ! starts_with_git "${MY_REPO}"; then
#     # git protocol can no be used without set the public key first
#     echo "First parameter must be the repo url"
#     exit 1
#   fi

CURRENT_DIR=$(pwd)

if [[ $(id -u -n) != "root" ]]; then
    echo "Este script debe ejecutarse como root"
    exit 1
fi

export FIRST_TIME_DEPLOY=true

export DEPLOYMENT=PROD
bash bootstrap.sh "${DEPLOYMENT}"

source variables.ini

echo "************************"
echo "${DEFAULT_USER_HOME}"
echo "************************"

mkdir -p "${DEFAULT_USER_HOME}"/.ssh
echo "${SSH_PUB_KEYS}" >> "${DEFAULT_USER_HOME}"/.ssh/authorized_keys
chown -R "${DEFAULT_USER}":"${DEFAULT_USER}" "${DEFAULT_USER_HOME}"/.ssh
chmod 700 "${DEFAULT_USER_HOME}"/.ssh
chmod 600 "${DEFAULT_USER_HOME}"/.ssh/authorized_keys

cd "${WWW_PATH}"/..
rm -rf "${WWW_PATH}"
git clone "${MY_REPO}"

cd "${WWW_PATH}"/
./scripts/util/echo_env_back.sh > back/.env
./scripts/util/echo_env_front.sh > front/.env.production

chown -R "${DEFAULT_USER}":www-data "${WWW_PATH}"

cd "${CURRENT_DIR}" || echo "BD y Media no instalado"

if [[ -f "${DUMP_FILE}" ]]; then
    bash drop_and_create_db.sh "${DUMP_FILE}"
fi

if [[ -n "${MEDIA_FILE}" ]] && [[ -d "${WWW_MEDIA_PATH}" ]] && [[ -z "$(ls -A ${WWW_MEDIA_PATH})" ]]; then
    echo "Quiere desplegar la carpeta 'media' pero esta ya existe y no está vacía"
else
    if [[ -f "${MEDIA_FILE}" ]]; then
        tar xzf "${MEDIA_FILE}"
        mv media/* "${WWW_MEDIA_PATH}"
        rm -r media
    fi
fi

echo -e "\n\n******** FINISH ********************\n\n"
echo "Update internal project documentation"
echo "
echo '${IP} ${MY_HOSTNAME}' >> /etc/hosts
echo -e 'Host ${MY_HOSTNAME}\n  HostName ${IP}\n  Preferredauthentications publickey\n  IdentityFile ~/.ssh/YOUR_KEY\n  Port ${SSH_PORT}\n  User ${MY_HOSTNAME}' >> ~/.ssh/config

# Update password manager with root, ${MY_HOSTNAME} and postgres password

# If needed, adjust other config like:
bash config_ssh.sh # edit it first

# In another shell ssh as non root user, check everything is ok and
# deploy the app, as not root

workon ${PROJECT_NAME}
./scripts/util/deploy_from_repo.sh
"
