#!/bin/bash

this_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null && pwd)"

source "${this_dir}"/../server/variables.ini
source "${this_dir}"/util/env.sh

# Limpiamos el directorio media
rm -rf "${this_dir}/../${BACKEND_FOLDER_NAME}/media/*"

# Creamos los directorios necesarios para los estáticos
mkdir -p "${this_dir}/../back/back/static"
mkdir -p "${this_dir}/../back/monitoring/static"
mkdir -p "${this_dir}/../front/build"
rm -f "${this_dir}/../back/back/front_build"
ln -s '../../front/build' "${this_dir}/../back/back/front_build"
