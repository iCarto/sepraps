#!/bin/bash

is_installed() {
    if dpkg -s "${1}" > /dev/null 2>&1; then
        echo "is installed"
    fi
}
