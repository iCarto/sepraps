#!/bin/bash

file_exists() {
    local file="${1}"
    [[ -f "${file}" ]]
}

if [[ $- == *i* || ${FUNCNAME[0]} == 'source' ]]; then
    : echo "sourced"
else
    if [[ $# -eq 0 ]]; then
        echo "No arguments provided"
        exit 1
    fi

    if file_exists "${1}"; then
        echo 'El directorio existe'
        true
    else
        echo 'El directorio no existe'
        false
    fi
fi
