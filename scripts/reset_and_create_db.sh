#!/bin/bash

this_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null && pwd)"

source "${this_dir}"/../server/variables.ini
source "${this_dir}"/../tools/db_utils.sh

reset_django_migrations() {
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
}

# Si se pasa cualquier parámetro a este comando crea una base de datos vacía
CREATE_EMPTY="${1}"

if [[ -f back/manage.py ]]; then
    reset_django_migrations
fi

# TODO: Revisar como hacer esto de forma adecuada (funciones?, script?)
bash "${this_dir}/../server/drop_and_create_db.sh"

bash "${this_dir}"/install.link_back_front.sh

if [[ "${DATABASE_CONTROL_CHANGES_MODE}" == "sqitch" ]]; then
    (
        cd "${this_dir}/../db" || exit
        sqitch deploy
    )
else
    # Crea las migraciones. migrations/__ini__.py debe existir para que se cree la
    # migración inicial de una app o debe invocarse la app de forma concreta
    # python manage.py makemigrations users
    python "${this_dir}/../back/manage.py" makemigrations
    # Ejecuta las migraciones contra la bd
    python "${this_dir}/../back/manage.py" migrate
fi

if [[ -z "${CREATE_EMPTY}" ]]; then
    "${this_dir}"/fixtures.sh
fi

if [[ -f ${this_dir}/../back/manage.py ]]; then
    DJANGO_SUPERUSER_PASSWORD="${DJANGO_SUPERUSER_PASSWORD}" python "${this_dir}/../back/manage.py" createsuperuser --no-input --username admin
    # In install.sh static folders are created
    # At this point static assets are collected
    python "${this_dir}/../back/manage.py" collectstatic --no-input --clear
fi
