#!/bin/bash

declare -a programs=("vagrant" "python3" "npm" "mkvirtualenv" "pyenv" "shfmt" "shellcheck")

## now loop through the above array
for program in "${programs[@]}"; do
    if ! command -v "${program}" > /dev/null 2>&1; then
        echo "${program} should be there. Run this script to install OS packages:"
        echo
        echo "./scripts/util/install.sh"
        echo
        exit 1
    fi
done
