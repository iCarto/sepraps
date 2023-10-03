# Instalación de SEPRAPS

Este documento describe como realizar la primera instalación de la herramienta.

Se trata de un proceso muy automatizado que apenas requiere un par de pasos manuales sobre todo para la configuración de algunos parámetros. Cada equipo IT deberá adecuar las instrucciones y scripts a sus propios procedimientos.

## Pre Requisitos

-   Servidor:
    ** 2GB de RAM
    ** 15 GB de Disco SSD para el sistema, aplicación y base de datos
    ** Espacio en disco adicional en función del volumen de ficheros adjuntos manejados en la aplicación
    ** Acceso por SSH. IP Estática Pública o Dominio. Acceso de root
    ** Sistema Operativo: Ubuntu Server 22.04 LTS
    ** El servidor debe estar "limpio", sólo debe tener una instalación base del sistema operativo y nada más
    \*\* No se establece un mínimo para la CPU, pero sería deseable que fuera al menos a 2GHz

-   Otros requisitos
    \*\* Conocimientos básicos de administración de sistemas Linux

## Resumen

-   Obtener una base de datos inicial (o backup de la base de datos existente)
-   Obtener un backup de los ficheros adjuntos (de ser el caso)
-   Descargar el script `server/first_time_deploy.sh` en el equipo local
-   Editar el script para asignar valores a las variables obligatorias. En caso de ser una restauración del servidor se debe usar el mismo script que en la primera instalación.
-   Subir el script, la base de datos y una carpeta con los ficheros adjuntos (en caso de existir) al servidor.
-   Ejecutar el script
-   Finalizar siguiendo las instrucciones que muestra el script por pantalla.

## Instrucciones

El script en lenguaje bash `server/first_time_deploy.sh` es el script que automatiza el despliegue. Este script debe descargarse al equipo local. Al inicio del fichero hay una sección indicada del siguiente modo:

```
######################
# SET THIS VARIABLES #
######################

# Create a deploy token, and fill MY_REPO with the full url including the token
# https://docs.gitlab.com/ee/user/project/deploy_tokens/index.html
# If the repo is public, no deploy token is needed, just the public url
export MY_REPO=''

[ ... ]

### You can also set this variables ###
# export SSH_PORT=10000

[ ... ]

#############################
# END OF SET THIS VARIABLES #
#############################
```

A cada una de las variables de esa sección se le debe poner de forma obligatoria un valor. Cada variable viene acompañada de un comentario que explica su significado.

Las variables bajo la sección `### You can also set this variables ###` son opcionales, y ya tienen asignado valores por defecto.

Una vez editado el fichero debe guardarse en lugar seguro puesto que podrá usarse para restaurar el sistema en otro servidor y contendrá claves y otra información sensible.

También debe obtenerse una primera versión de la base de datos (dump de PostgreSQL) o en caso de tratarse de una restauración del sistema de:

-   Dump o Backup de la base de datos
-   Carpeta con los ficheros adjuntos.

Esos tres contenidos deben subirse al servidor. Por ejemplo pueden comprimirse en un único fichero y subirse por scp.

```
tar czvf "$(date +%y%m%d)_deploy_files.tgz" first_time_deploy.sh database.dump media_folder
scp "$(date +%y%m%d)_deploy_files.tgz" root@ip_del_servidor:/tmp
```

A continuación nos conectamos al servidor, descomprimimos los ficheros y ejecutamos el script:

```
ssh root@ip_del_servidor
cd /tmp
tar xzvf "$(date +%y%m%d)_deploy_files.tgz"
bash first_time_deploy.sh
```

En medio del script puede pedir la introducción de alguna contraseña (debe chequearse con atención la clave de que usuario está pidiendo) o confirmar algún dato.

Al finalizar el servidor recomienda la actualización de algunos valores en el equipo local como `/etc/hosts`, anotar las claves, ... pero pueden ser ignorados.

Lo que debe ejecutarse obligatoriamente son las últimas instrucciones de:

```
ssh DEFAULT_USER@ip_del_servidor
workon sepraps
./scripts/deploy.sh
```

## Qué hace el script de instalación

El script de `first_time_deploy.sh` se emplea sobre todo para fijar los valores necesarios para algunas variables y activar el modo _producción_ para el resto de scripts. Además crea un nuevo usuario definido por la variable `DEFAULT_USER` que será bajo el que se instale y ejecute la aplicación. También descarga el repositorio de código donde se encuentra la aplicación y el resto de scripts para configurar el servidor. Y por último restaura una base de datos y los ficheros adjuntos si existen.

Tras descargar el repositorio de código, `first_time_deploy.sh` llama a `bootstrap.sh` que a su vez va llamando a distintos scripts que configuran aspectos particulares del sistema:

-   `set_hostname_and_ip.sh`. Simplemente configura el nombre del servidor y la ip pública cuando tiene sentido en `/etc/hosts`.
-   `fix_locales.sh` y `config_time.sh` simplemente se encarga de configurar la hora y el idioma del servidor.
-   `install_others.sh`, `install_git.sh` instala algunos paquetes básicos para el resto de fases como un editor de texto, herramientas para compilar y git.
-   `install_postgres.sh` instala el servidor de bases de datos PostgreSQL a partir de los repositorios apt oficiales de PostgreSQL en lugar de los de la distribución para facilitar el proceso de actualización posterior
-   `install_sqitch.sh` instala y configura `sqitch` una herramienta usada para las _migraciones_ de la base datos. Realizar cambios en el esquema de las tablas, ... cuando hay una nueva versión de la aplicación.
-   `install_node_and_npm.sh` y `create_python_virtualenv_project.sh` se encargan de instalar nodejs para poder construir el código JavaScript y de instalar la versión adecuada de Python, más algunas utilidades para la gestión de entornos virtuales Python.
-   `install_apache.sh` y `install_letsencrypt.sh`Instala este servidor web junto a su plugin `mod_wsgi` para ejecutar aplicaciones Python y lo configura. Además instala un certificado https de letsencrypt cuando el servidor dispone de un dominio.
-   El resto de script se encargan de actualizar todos los paquetes de software, hacer algo de limpieza y mejorar la seguridad.
