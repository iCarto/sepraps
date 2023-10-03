# Mantenimiento básico de un servidor para SEPRAPS

Esta no es ni mucho menos una guía completa sobre el mantenimiento de un servidor Linux. Simplemente se indican algunas actividades que deberían ser realizadas de forma periódica y pueden considerarse básicas.

## Actualización de paquetes del sistema

Los scripts de instalación configuran la instalación automática de paquetes cuando esta es segura. Pero esto requiere cierta intervención manual periódica, para aquellos paquetes que pueden ser más problemáticos o que requieren revisar a mano la configuración.

Básicamente:

```
# Conectar al servidor por ssh
ssh DEFAULT_USER@ip_del_servidor

# Identificarse como root
sudo su

# Actualizar el listado de paquetes
apt update

# Actualizar los paquetes
apt upgrade

# Revisar configuraciones, posibles incidencias, ...

# Hacer limpieza
apt autoclean
apt autoremove

# En caso de ser necesario reiniciar el sistema
reboot
```

## Revisar logs

Los logs muestra información de errores, avisos, ... Los logs más relevantes en este caso serían:

-   `/var/log/postgresql`: Logs de PostgreSQL
-   `/var/log/apache2`: Logs de Apache y de la aplicación
-   Ejecutar el comando `journalctl -r` para ver los últimos logs del sistema

## Backups

En un servidor de backups de forma automática (lo más recomendable) o al menos a mano deben realizarse backups de dos cosas:

-   Base de datos `sepraps`. Llega con realizar un dump de la base de datos
-   Ficheros adjuntos. Por defecto en la ruta `/var/www/media`
