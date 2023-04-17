#!/bin/bash

this_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null && pwd)"

# shellcheck source=variables.ini
source "${this_dir}"/variables.ini

# https://github.com/pyenv/pyenv/wiki/Common-build-problems
# https://docs.python.org/3/using/unix.html#building-python
yum upgrade -y
yum -y groupinstall "Development Tools"
yum install -y python python-pip python3-pip gcc zlib-devel bzip2 bzip2-devel readline-devel sqlite sqlite-devel openssl-static openssl-devel tk-devel libffi-devel xz-devel wget yum-utils

# No se puede hacer sobre /vagrant. Seguramente es porque hace un hardlink
# en algún momento del proceso y no es válido en una carpeta compartida
url="https://www.python.org/ftp/python/${PYTHON_VERSION}/{Python-${PYTHON_VERSION}.tgz}"

curl "${url}" --create-dirs -o '/tmp/#1' --max-redirs 5 --location --silent --show-error
tar xzp --file="/tmp/Python-${PYTHON_VERSION}.tgz" -C /tmp
cd "/tmp/Python-${PYTHON_VERSION}" || (echo "Error" && exit)

# Compilamos e instalamos en /opt/python-${PYTHON_VERSION}, porqué así es más fácil desinstalar
# https://unix.stackexchange.com/questions/190794/
#
# --enabled-shared - is only needed if mod_wsgi is used
# * https://github.com/pyenv/pyenv/wiki#how-to-build-cpython-with---enable-shared
# * https://github.com/pyenv/pyenv/issues/392
#
# --enable-optimizations - don't work with centos 7 default gcc version
./configure --enabled-shared --prefix "${PYTHON_DIR}" --with-ensurepip=install --enable-loadable-sqlite-extensions --with-lto --enable-optimizations # --enable-shared
make -j8

if [[ -d "${PYTHON_DIR}" ]]; then
    # readlink used to avoid issues with final '/' being or not present
    BACKUP_FOLDER=$(readlink -e "${PYTHON_DIR}").${TODAY}
    rm -rf "${BACKUP_FOLDER}"
    mv "${PYTHON_DIR}" "${BACKUP_FOLDER}"
fi

# `install` crea ${prefix}/bin/pyhon3 y ${prefix}/bin/pyhon3.x mientras que `altinstall` sólo crea
# pyhon3.x. Si no se va usar un `prefix` distinto a los del sistema debe usarse altinstall
make install

cd "${this_dir}/.."

# Si se usa --enable-shared, nos aseguramos de que los .so linkan adecuadamente
# al no usar mod_wsgi no hace falta enabled_shared
sudo ldconfig -v
sudo ldconfig /usr/local/lib

# Limpiamos las descargas
rm "/tmp/Python-${PYTHON_VERSION}.tgz"
rm -rf "/tmp/Python-${PYTHON_VERSION}"

if [[ $("${PYTHON_DIR}/bin/python3" --version) != "Python ${PYTHON_VERSION}" ]]; then
    echo "Python no instalado correctamente"
    exit 1
fi

if "${PYTHON_DIR}/bin/python3" -m pip --version > /dev/null; then
    echo "pip no instalado correctamente"
    exit 1
fi
