#!/bin/bash

set -e

this_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null && pwd)"

source "${this_dir}"/../server/variables.ini
source "${this_dir}"/util/env.sh
source "${this_dir}"/util/db_utils.sh

# Si se pasa cualquier parámetro a este comando crea una base de datos vacía
CREATE_EMPTY="${1}"

cd "${this_dir}/../${BACKEND_FOLDER_NAME}" || {
    echo "Can not access: ${this_dir}/../${BACKEND_FOLDER_NAME}"
    exit 1
}

# Eliminamos todo para restaurarlo de cero y creamos una bd limpia
# rm -f db.sqlite3
find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
find . -path "*/migrations/*.pyc" -delete
drop_db_and_kickout_users "${DBNAME}"

create_db_from_template 'template1' "${DBNAME}"

# Limpiamos el directorio media
rm -rf "${this_dir}/../${BACKEND_FOLDER_NAME}/media/*"

# Creamos los directorios necesarios para los estáticos
mkdir -p "${this_dir}/../back/back/static"
mkdir -p "${this_dir}/../back/monitoring/static"
mkdir -p "${this_dir}/../front/build"
rm -f back/front_build
ln -s ../../front/build back/front_build

# Crea las migraciones. migrations/__ini__.py debe existir para que se cree la
# migración inicial de una app o debe invocarse la app de forma concreta
# python manage.py makemigrations users
python manage.py makemigrations

# Ejecuta las migraciones contra la bd
python manage.py migrate

export DJANGO_SUPERUSER_PASSWORD
python manage.py createsuperuser --no-input --username admin

if [[ -z "${CREATE_EMPTY}" ]]; then
    python "${this_dir}/database.py" "${this_dir}/data/Barrios_Localidades_Paraguay_Codigos_DGEEC.csv" > "${this_dir}/data/fixtures_location.json"
    python manage.py loaddata "${this_dir}/data/fixtures_location.json"
    python manage.py loaddata "${this_dir}/data/fixtures_data.json"
    python manage.py loaddata "${this_dir}/data/fixtures_milestones.json"
    cp -r "${this_dir}/data/folder_data/"* "${this_dir}/../${BACKEND_FOLDER_NAME}/media/"
fi

# In install.sh static folders are created
# At this point static assets are collected
echo -e "yes" | python manage.py collectstatic -c
