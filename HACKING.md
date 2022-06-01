# Git Structure

-   Repo url: git@gitlab.com:icarto-private/sepraps.git

-   back: Django REST API + Django Admin
-   front: React SPA frontend
-   scripts: For install, deploy, ... scripts-to-rule-them-all style
-   db: Not used now. For sqitch
-   tools: Not used now. For utilities, wrangling data and so on, ...
-   docs
-   server: For Vagrant and (VPS) Production provisioning

## Branches

-   `main`. principal/master branch. Code deployed in production
-   `development`. PR and development goes here.

## Pre Commit

The project is setup by default with strict linters that run on pre commit. By sometimes a quick fix is needed and you want to go over the linters. Use `git commit --no-verify` or set it to `[manual]` in `.pre-commit-config.yaml`.

# Pre-Requisites

-   [VirtualBox and Vagrant](https://gitlab.com/icarto/ikdb/blob/master/configurar_equipo/linux/virtualbox_y_vagrant.md)
-   [nodejs y npm](https://gitlab.com/icarto/ikdb/blob/master/configurar_equipo/linux/instalar_y_actualizar_node_y_npm.md)
-   Virtualenwrapper

```shell
sudo pip3 install --upgrade pip
sudo pip3 install --upgrade virtualenvwrapper
_PYTHON_PATH=$(command -v "python3")
_VIRTUALENVWRAPPER_PATH=/usr/local/bin/virtualenvwrapper.sh
echo "VIRTUALENVWRAPPER_PYTHON=${_PYTHON_PATH}" >> ~/.bashrc
echo "source ${_VIRTUALENVWRAPPER_PATH}" >> ~/.bashrc
source ~/.bashrc
echo 'cdproject' >> ~/.virtualenvs/postactivate
```

-   pyenv

```shell
sudo apt-get update
sudo apt-get install -y make build-essential libssl-dev zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm libncursesw5-dev xz-utils tk-dev libxml2-dev libxmlsec1-dev libffi-dev liblzma-dev
curl -L https://github.com/pyenv/pyenv-installer/raw/master/bin/pyenv-installer | bash
sed -Ei -e '/^([^#]|$)/ {a \
export PYENV_ROOT="${HOME}/.pyenv"
a \
export PATH="${PYENV_ROOT}/bin:${PATH}"
a \
' -e ':a' -e '$!{n;ba};}' ~/.profile

echo '
eval "$(pyenv init --path)"
' >> ~/.profile

echo '
eval "$(pyenv init -)"
' >> ~/.bashrc
```

-   [shfmt](https://gitlab.com/icarto/ikdb/-/blob/wip_linters/linters_estilo_codigo_y_formatters/estilo_codigo_y_formatters/herramientas/formatters_bash.md#configuraci%C3%B3n-icarto)
-   [shellcheck](https://gitlab.com/icarto/ikdb/-/blob/wip_linters/linters_estilo_codigo_y_formatters/linters/5.linters_bash.md#configuraci%C3%B3n-icarto)

This pre-requistes should be installed previous to the current user session. So if this is the first time you are installing it, Log out from the system and Log in again.

And remember to keep the used ports open: `3000`, `5432`, `8000`, `8080`.

```shell
sudo lsof -i -P -n | grep LISTEN
```

_Note_: Probably, you can avoid install things in your host accessing the Vagrant guess as it should contain all the dependencies. So you can even launch the back/front inside the Vagrant just opening the appropriate ports. But, this behaviour was not being tested.

# First Time and Each Development Phase

Most of the Development Environment setup can be done with scripts in Ubuntu 18.04. But some of then mess up with your operating system config files and ask for `sudo` access. So carefully review what is being done.

A production like environment is setup with Vagrant.

We strongly recommend follow this steps before each "development phase" to ensure that the latest dependencies have been upgraded.

```shell
git clone git@gitlab.com:icarto-private/sepraps.git
cd sepraps

# Clean up
source server/variables.ini
vagrant destroy
rmvirtualenv "${PROJECT_NAME}"

vagrant up
vagrant halt
vagrant up

# Set up the dependencies
./scripts/install.sh

deactivate

workon sepraps
# ./scripts/test.sh
```

## Restore fixtures/development database

Use the script

```shell
./scripts/reset_db_and_create.sh empty
```

if `empty` is ommited the script loads in the database the fixtures.

# Development

The common workflow:

```shell
workon sepraps
code . # or your favourite IDE
./scripts/start.sh
```

Instead of `start.sh` script you can open two consoles:

````shell
# Launch back
workon sepraps; cd back; python manage.py runserver_plus
# Lauch front
cd front; npm start


# Deployment

NOT READY YET

```shell
./scripts/deploy.sh
````

Example

```shell
workon sepraps
git ir a la rama buena y hacer fetch
# git clean -fdx Not do it because remove the .env
cd back && pip install -r requirements.txt && cd ..
cd front && npm install && npm run build && cd ..
cd back && echo -e "yes" | python manage.py collectstatic -c && cd ..
# Migrate BD ?
systemctl restart apache2
```

# Automated Test

NOT READY YET

# Test in a production like environment

NOT READY YET

```shell
vagrant ssh
cd sepraps
./scripts/deploy.sh
```
