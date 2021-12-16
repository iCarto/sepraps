# Users

`users` es una aplicación Django para _scafoldear_ la gestión de usuarios en aplicaciones de intranet. Por ahora sólo incluye la gestión de usuarios a través del Admin y de djangorestframework.

1. Añade "users" a INSTALLED_APPS:

    INSTALLED_APPS = [
    ...
    "users",
    ]

2. Añade la configuración de URLs en el fichero `urls.py` del proyecto:

    path('urls/', include('users.urls')),

3. Ejecuta `python manage.py makemigrations users` para generar las migraciones y `python manage.py migrate` para ejecutarlas.
