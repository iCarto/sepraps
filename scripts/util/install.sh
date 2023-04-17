#!/bin/bash
set -e

if [[ "${OSTYPE}" == "linux-gnu" ]]; then
    sudo apt update -qq
    sudo apt install python3 python3-pip nodejs npm
elif [[ "${OSTYPE}" == "darwin"* ]]; then
    brew install python3 nodejs npm
fi

echo "Some dependencies should be installed by hand. Check Pre-Requisites in HACKING.md"

exit
