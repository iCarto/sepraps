#!/bin/bash

# This script is still in "alpha". Use it with caution
#
# Copy this file to your server or VPS after login as root
# ssh root@ip
# Fill the variables at the beggining of this script
# Log as root
# Execute this file as `bash first_time_deploy.sh`
# Put your passwords and configuration in a secure place
# Test ssh access from a new conexion
# Remove this file and finish configuration

set -e

# https://www.linode.com/docs/getting-started/
# https://docs.gitlab.com/ee/user/project/deploy_tokens/index.html

######################
# SET THIS VARIABLES #
######################
# Create a deploy token, and fill MY_REPO with the full url including the token
export MY_REPO=''

# Authorized public keys
SSH_PUB_KEYS=''

# A new user will be created, usually the same name as the PROJECT_NAME
export DEFAULT_USER=''

# Password for the new user
export DEFAULT_USER_PASSWORD=''

# Database password for postgres user
export PG_POSTGRES_PASSWD=''

BACK_ENV_FILE=''

FRONT_ENV_FILE=''

# Path to a dump of the database to be restored
DATABASE_DUMP=''

# Path to a folder with the attachments to be restored
MEDIA_FOLDER=''

# Path to apache conf file
APACHE_CONF_FILE=

# You can also set this variables
# export SSH_PORT=10000
# export MY_HOSTNAME=
# export PG_PORT=
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

export DEBIAN_FRONTEND=noninteractive
export UCF_FORCE_CONFFNEW=1
apt update && apt upgrade -y
apt install -y git emacs-nox

cd /tmp

git clone "${MY_REPO}"

MY_REPO_FOLDER=$(echo "${MY_REPO}" | awk -F '/' '{gsub(".git", ""); print $NF}')

cd "${MY_REPO_FOLDER}/server/"

export FIRST_TIME_DEPLOY=true
export DEPLOYMENT=PROD
bash add_default_user.sh

# mv /tmp/"${MY_REPO}" "${DEFAULT_USER_HOME}"/"${MY_REPO}"
# cd "${DEFAULT_USER_HOME}"/"${MY_REPO}"/server
chown -R "${DEFAULT_USER}":"${DEFAULT_USER}" ../../"${MY_REPO_FOLDER}"

bash bootstrap.sh PROD
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
" >> ${WWW_PATH}/back/.env
echo "${FRONT_ENV_FILE}" > "${WWW_PATH}/front/.env.production"

chown -R "${DEFAULT_USER}":www-data "${WWW_PATH}"

rm -rf "${WWW_MEDIA_PATH}"
cp -r "${MEDIA_FOLDER}" "${WWW_MEDIA_PATH}"
chown -R "${DEFAULT_USER}":www-data "${WWW_MEDIA_PATH}"

source scripts/db_utils.sh
PGPASSWORD="${PG_POSTGRES_PASSWD}" create_last_db "${TODAY}_bck_${DBNAME}" "${DATABASE_DUMP}"
PGPASSWORD="${PG_POSTGRES_PASSWD}" create_db_from_template "${TODAY}_bck_${DBNAME}" "${DBNAME}"

if [[ -n "${APACHE_CONF_FILE}" ]]; then
    cp "${APACHE_CONF_FILE}" /etc/apache2/sites-available/
    chown root:root /etc/apache2/sites-available/sepraps.conf
    chmod 644 /etc/apache2/sites-available/sepraps.conf
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
scripts/deploy.sh
"
