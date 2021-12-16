#!/bin/bash

this_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null && pwd)"

# shellcheck source=folder_exists.sh
source "${this_dir}/folder_exists.sh"

# shellcheck source=file_exists.sh
source "${this_dir}/file_exists.sh"
