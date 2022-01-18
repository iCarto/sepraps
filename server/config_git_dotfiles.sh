#!/bin/bash

source variables.ini

cp "${SETTINGS}"/other-settings/gitconfig "${DEFAULT_USER_HOME}/.gitconfig"
chown "${DEFAULT_USER}":"${DEFAULT_USER}" "${DEFAULT_USER_HOME}/.gitconfig"
