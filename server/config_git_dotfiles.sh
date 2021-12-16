#!/bin/bash

source variables.ini

cp "${SETTINGS}"/other-settings/gitconfig ~/.gitconfig
chown "${DEFAULT_USER}":"${DEFAULT_USER}" ~/.gitconfig
