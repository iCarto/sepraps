#!/bin/bash

this_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null && pwd)"

source "${this_dir}"/../server/variables.ini

# Limpiamos el directorio media
rm -rf "${this_dir}/../back/media/*"

# Creamos los directorios necesarios para los estáticos
mkdir -p "${this_dir}/../back/back/static"
mkdir -p "${this_dir}/../back/app/static"
mkdir -p "${this_dir}/../front/build"
rm -f "${this_dir}/../back/back/front_build"
ln -s '../../front/build' "${this_dir}/../back/back/front_build"
