#!/bin/bash

set -euo pipefail

usage() {
    echo "Syntax: $(basename "${0}") [-f] [-b] [-s]"
    echo "Options:"
    echo "-f | --front : Launches frontend"
    echo "-b | --back : Launches backend"
    echo "-s | --shell : Launches a shell"
}

die() {
    printf '\n%s\n' "${1}" >&2
    exit 1
}

if [[ "${#}" -ne 1 ]]; then
    usage
    die "ERROR: One, and only one option can be given"
fi

case "${1}" in
    -h | -\? | --help)
        usage
        ;;
    -f | --front)
        # https://coderrocketfuel.com/article/stop-create-react-app-from-opening-a-browser-window-on-start
        (cd front && BROWSER=none REACT_APP_API_BASE_URL=http://localhost:8000 npm run start)
        ;;
    -b | --back)
        # if ! command -v deactivate ; then
        #     die "ERROR: Activate a virtualenv before continue."
        # fi
        # command -v deactivate || die "ERROR: Activate a virtualenv before continue."
        (cd back && python manage.py runserver_plus)
        ;;
    -s | --shell)
        (cd back && python manage.py shell_plus --ipython)
        ;;
    *)
        die "ERROR: Unknown option: ${1}"
        ;;
esac
