#!/bin/bash

folder_exists() {
    local FOLDER="${1}"
    [[ -d "${FOLDER}" ]]
}

if [[ $- == *i* || ${FUNCNAME[0]} == 'source' ]]; then
    : echo "sourced"
else
    if [[ $# -eq 0 ]]; then
        echo "No arguments provided"
        exit 1
    fi

    if folder_exists "${1}"; then
        echo 'El directorio existe'
        true
    else
        echo 'El directorio no existe'
        false
    fi
fi
