#!/bin/bash

source variables.ini

sed -i "s/^# ${LOCALE} UTF-8/${LOCALE} UTF-8/" /etc/locale.gen
locale-gen
update-locale --reset LANG="${LOCALE}" LC_CTYPE="${LOCALE}"
export LANG="${LOCALE}"
export LC_TYPE="${LOCALE}"
