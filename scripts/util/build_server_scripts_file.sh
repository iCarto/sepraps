#!/bin/bash

set -euo pipefail

FILEPATH="${1}"

rm -rf server/downloads
tar czpvf "${FILEPATH}" server
