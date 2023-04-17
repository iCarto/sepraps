#!/bin/bash

source variables.ini

# Allow the system to use $LOCALE
sed -i "s/^# ${LOCALE} UTF-8/${LOCALE} UTF-8/" /etc/locale.gen
locale-gen

# Uncomment these lines if $LOCALE must be the default
# update-locale --reset LANG="${LOCALE}" LC_CTYPE="${LOCALE}"
# export LANG="${LOCALE}"
# export LC_TYPE="${LOCALE}"
