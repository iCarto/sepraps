#!/bin/bash

# Check `docs/instalacion.md` for instrucctions of how this script must be used.

set -e

######################
# SET THIS VARIABLES #
######################

# Create a deploy token, and fill MY_REPO with the full url including the token
# https://docs.gitlab.com/ee/user/project/deploy_tokens/index.html
# If the repo is public, no deploy token is needed, just the public url
# Example:
# export MY_REPO='https://gitlab.com/icarto/sepraps'
export MY_REPO=''

# It's recommended to use only SSH Keys to access the server. But this script does not configure SSH Key only access. Do it yourself.
# https://www.cyberciti.biz/faq/how-to-set-up-ssh-keys-on-linux-unix/
# In case you already have an SSH Key add it here
# Example:
# SSH_PUB_KEYS='
# ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAINSrnpoXX6fh3+yJFKz0tV7NoseCCb73JLYnLqiXliNw foo@example.com
# '
SSH_PUB_KEYS=''

# A new user will be created, usually the same name as the PROJECT_NAME
# This user should be used instead of root to run the application, or ssh connections
# Example:
# export DEFAULT_USER='sepraps'
export DEFAULT_USER=''

# Password for the new $DEFAULT_USER
export DEFAULT_USER_PASSWORD=''

# Authorized public keys
SSH_PUB_KEYS=''

# Database password for postgres user
export PG_POSTGRES_PASSWD=''

# This variable must be the content of the production `.env` file with enviroment variables that
# should be passed to the application:
# Example:
# BACK_ENV_FILE='
# DEPLOYMENT=PROD
# DEBUG=False
# SECRET_KEY=your-secret-key
# DATABASE_URL=psql://user@server:port/dbname
# DATABASE_CONTROL_CHANGES_MODE=sqitch
# HTTPS=True
# ALLOWED_HOSTS=server_domain,server_ip
# MONITORING_TEMPLATES_FOLDER=path_to_application/back/monitoring/data
# SENTRY_DSN=https://token@url
# MEDIA_ROOT=path_to_media_folder
# ...
# '
BACK_ENV_FILE=''

# This variable must be the content of the production `.env` file with enviroment variables that
# should be passed to webpack when building the frontend:
# Example:
# FRONT_ENV_FILE='
# REACT_APP_API_BASE_URL=https://my_ip_or_domain
# REACT_APP_SENTRY_DSN=https://token@url
# ...
# '
FRONT_ENV_FILE=''

# Path to a dump of the database to be restored
# Example:
# DATABASE_DUMP='/tmp/dababase.dump'
DATABASE_DUMP=''

# Path to a folder with the attachments to be restored. It can be let blank
# Example:
# MEDIA_FOLDER='/tmp/media_folder'
MEDIA_FOLDER=''

# Path to apache conf file
# It can be left blank in case you don't want to provide a custom Apache configuration a basic one
# will be generated by default
APACHE_CONF_FILE=

### You can also set this variables ###
# export SSH_PORT=10000
# export MY_HOSTNAME=
# export PG_PORT=5432
# export SERVER_RDNS=

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

echo "${BACK_ENV_FILE}" > "${WWW_PATH}/back/.env"
echo "
MEDIA_ROOT=${WWW_MEDIA_PATH}
" >> "${WWW_PATH}/back/.env"
echo "${FRONT_ENV_FILE}" > "${WWW_PATH}/front/.env.production"

chown -R "${DEFAULT_USER}":www-data "${WWW_PATH}"

if [[ -d "${MEDIA_FOLDER}" ]]; then
    rm -rf "${WWW_MEDIA_PATH}"
    cp -r "${MEDIA_FOLDER}" "${WWW_MEDIA_PATH}"
    chown -R "${DEFAULT_USER}":www-data "${WWW_MEDIA_PATH}"
fi

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
./scripts/deploy.sh
"
