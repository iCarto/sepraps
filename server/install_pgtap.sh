#!/bin/bash

this_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null && pwd)"

# shellcheck source=bash-functions/folder_exists.sh
source "${this_dir}/bash-functions/folder_exists.sh"

source variables.ini

apt-get install -y unzip cpanminus build-essential "postgresql-server-dev-${PG_VERSION}"
cpanm --quiet --notest TAP::Parser::SourceHandler::pgTAP

if ! folder_exists "downloads/pgtap-${PGTAP_VERSION}"; then
    mkdir -p downloads
    url="http://api.pgxn.org/dist/pgtap/${PGTAP_VERSION}/{pgtap-${PGTAP_VERSION}.zip}"
    curl "${url}" --create-dirs -o 'downloads/#1' --max-redirs 5 --location --silent --show-error
    unzip "downloads/pgtap-${PGTAP_VERSION}.zip" -d "downloads/pgtap-${PGTAP_VERSION}"
fi

(
    cd "downloads/pgtap-${PGTAP_VERSION}/pgtap-${PGTAP_VERSION}" || exit
    make
    make install
)

# cp /vagrant/server/proverc ./sqitch/.proverc  # Already pushed to the repo
# CREATE EXTENSION pgtap;                       # Must be done by hand or when final db is ready
