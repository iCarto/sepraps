#!/bin/bash

source variables.ini

if [[ "${OS_CODENAME}" != "focal" ]] && [[ "${OS_CODENAME}" != "jammy" ]]; then
    echo "Check OS version."
    echo "Probably you must install $(python-gdal) instead of $(python3-gdal) if os is previous to focal"
    exit 1
fi

apt install -y libproj-dev gdal-bin python3-gdal
