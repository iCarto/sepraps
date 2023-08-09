#!/bin/bash

# This script is used when there is no need to setup the full server but only update the application, media or database

die() {
    printf '%s\n' "${1}" >&2
    exit 1
}

check_if_root() {
    if [[ $(id -u -n) != "root" ]]; then
        die 'ERROR: Este script debe ejecutarse como root'
    fi
}

check_media() {
    local MEDIA_FILE="${1}"
    if [[ -n "${MEDIA_FILE}" ]] && [[ -d /opt/media_sisbagal ]] && [[ -z "$(ls -A /opt/media_sisbagal)" ]]; then
        echo "Quiere desplegar la carpeta 'media' pero esta ya existe y no está vacía"
        exit 1
    fi
}

check_if_root

APP_FILE=
DUMP_FILE=
MEDIA_FILE=
DEFAULT_USER=

while [[ -n "${1}" ]]; do # while loop starts
    case "${1}" in

        --default-user)
            if [[ -n "${2}" ]]; then
                DEFAULT_USER="${2}"
                export DEFAULT_USER
                shift
            else
                die 'ERROR: "--default-user requires a non-empty option argument.'
            fi
            ;;

        --app-file)
            if [[ -n "${2}" ]]; then
                APP_FILE="${2}"
                shift
            else
                die 'ERROR: "--app-file" requires a non-empty option argument.'
            fi
            ;;
        --dump-file)
            if [[ -n "${2}" ]]; then
                DUMP_FILE="${2}"
                shift
            else
                die 'ERROR: "--dump-file" requires a non-empty option argument.'
            fi
            ;;
        --media-file)
            if [[ -n "${2}" ]]; then
                MEDIA_FILE="${2}"
                shift
            else
                die 'ERROR: "--media-file" requires a non-empty option argument.'
            fi
            ;;

        *)
            die "WARN: Unknown option: ${1}"
            ;;
    esac
    shift
done

if [[ -z "${DEFAULT_USER}" ]]; then
    die "ERROR: Debe especificar el usuario que corre la aplicacion con --default-user"
fi

if ! getent passwd "${DEFAULT_USER}" > /dev/null; then
    die "ERROR: El usuario ${DEFAULT_USER} no existe"
fi

export DEFAULT_USER

if [[ -f "${DUMP_FILE}" ]]; then
    bash drop_and_create_db.sh "${DUMP_FILE}"
else
    echo "No existe fichero de dump, no se actualiza la base de datos"
fi

if [[ -f "${MEDIA_FILE}" ]]; then
    # check_media "${MEDIA_FILE}"
    rm -rf /var/www/media/*
    tar xzf "${MEDIA_FILE}"
    mv media/* /var/www/media
    chown -R "${DEFAULT_USER}":"${DEFAULT_USER}" /var/www/media
    rm -r media
else
    echo "No existe fichero de media, no se actualiza la carpeta de adjuntos"
fi

if [[ -f "${APP_FILE}" ]]; then
    workon sepraps
    python -m pip install "${APP_FILE}"
    sudo systemctl restart sepraps
else
    echo "No existe fichero de app, no se actualiza la aplicación"
fi
