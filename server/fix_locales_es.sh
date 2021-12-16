#!/bin/bash

source variables.ini

MAIN_LOCALE="${LOCALE%_*}"

apt-get install -y "language-pack-${MAIN_LOCALE}" "language-pack-${MAIN_LOCALE}-base"
apt-get remove -y --purge "firefox-locale-${MAIN_LOCALE}"

locale-gen "${LOCALE}"
dpkg-reconfigure -f noninteractive locales
update-locale --reset LANG="${LOCALE}" LC_CTYPE="${LOCALE}"
export LANG="${LOCALE}"
export LC_TYPE="${LOCALE}"
