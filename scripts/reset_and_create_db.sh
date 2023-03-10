#!/bin/bash

this_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null && pwd)"

source "${this_dir}"/../server/variables.ini
source "${this_dir}"/util/env.sh
source "${this_dir}"/../tools/db_utils.sh

# Si se pasa cualquier parámetro a este comando crea una base de datos vacía
CREATE_EMPTY="${1}"

# Eliminamos todo para restaurarlo de cero y creamos una bd limpia
# rm -f db.sqlite3
find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
find . -path "*/migrations/*.pyc" -delete

SITE_PACKAGES=$(python -c "from distutils.sysconfig import get_python_lib; print(get_python_lib())")

# Eliminamos también las migraciones de los paquetes de django que utilicemos
# para que no se creen migraciones intermedias
find "${SITE_PACKAGES}/django/contrib/auth" -path "*/migrations/*.py" -not -name "__init__.py" -delete
find "${SITE_PACKAGES}/django/contrib/auth" -path "*/migrations/*.pyc" -delete
find "${SITE_PACKAGES}/django/contrib/admin" -path "*/migrations/*.py" -not -name "__init__.py" -delete
find "${SITE_PACKAGES}/django/contrib/admin" -path "*/migrations/*.pyc" -delete
find "${SITE_PACKAGES}/django/contrib/contenttypes" -path "*/migrations/*.py" -not -name "__init__.py" -delete
find "${SITE_PACKAGES}/django/contrib/contenttypes" -path "*/migrations/*.pyc" -delete

drop_db_and_kickout_users "${DBNAME}"

create_db_from_template 'template1' "${DBNAME}"

bash "${this_dir}"/install.link_back_front.sh

if [[ "${DATABASE_CONTROL_CHANGES_MODE}" == "sqitch" ]]; then
    cd "${this_dir}/../sqitch" || exit
    sqitch deploy
    cd "${this_dir}/../${BACKEND_FOLDER_NAME}" || exit
else
    cd "${this_dir}/../${BACKEND_FOLDER_NAME}" || exit
    # Crea las migraciones. migrations/__ini__.py debe existir para que se cree la
    # migración inicial de una app o debe invocarse la app de forma concreta
    # python manage.py makemigrations users
    python manage.py makemigrations
    # Ejecuta las migraciones contra la bd
    python manage.py migrate
fi

export DJANGO_SUPERUSER_PASSWORD
python manage.py createsuperuser --no-input --username admin

if [[ -z "${CREATE_EMPTY}" ]]; then
    python "${this_dir}/database.py" "${this_dir}/data/Barrios_Localidades_Paraguay_Codigos_DGEEC.csv" > "${this_dir}/data/fixtures_location.json"
    # To generate fixtures auth
    # python manage.py dumpdata auth.Group users.User --natural-foreign --natural-primary --indent 4 > fixtures_auth.json
    # And remove admin user inside file
    rm -rf "${this_dir}/../${BACKEND_FOLDER_NAME}/media/"*
    cp -r "${this_dir}/data/folder_data/"* "${this_dir}/../${BACKEND_FOLDER_NAME}/media/"
    python manage.py loaddata "${this_dir}/data/fixtures_auth.json"
    python manage.py loaddata "${this_dir}/data/fixtures_location.json"
    python manage.py loaddata "${this_dir}/data/fixtures_data.json"
    python manage.py loaddata "${this_dir}/data/fixtures_questionnaires.json"
    python manage.py loaddata "${this_dir}/data/fixtures_project_questionnaires.json"
    python manage.py loaddata "${this_dir}/data/fixtures_contrato_13_2019.json"
    python manage.py loaddata "${this_dir}/data/fixtures_contrato_14_2019.json"
    python manage.py loaddata "${this_dir}/data/fixtures_contrato_20_2019.json"
    python manage.py loaddata "${this_dir}/data/fixtures_contrato_24_2019.json"
    python manage.py loaddata "${this_dir}/data/fixtures_contrato_15_2019.json"
    python manage.py loaddata "${this_dir}/data/fixtures_documents.json"
    python manage.py shell < "${this_dir}/data/update_milestones.py"
    python manage.py shell < "${this_dir}/data/set_featured_images.py"
fi

# In install.sh static folders are created
# At this point static assets are collected
echo -e "yes" | python manage.py collectstatic -c
