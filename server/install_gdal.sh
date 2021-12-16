#!/bin/bash

source variables.ini

apt-get install -y libproj-dev gdal-bin

OS_CODENAME=$(lsb_release -cs)

if [[ "${OS_CODENAME}" == "focal" ]]; then
    apt-get install -y python3-gdal
else
    apt-get install -y python-gdal
fi
