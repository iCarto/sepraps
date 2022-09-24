In a hurry? Go to [Recap](#recap)

# Conventions

We asume that the following variables are set up if you are copy&pasting the commands in this file.

You can use your own values.

```
# Name of the proyect. Used for virtualenv names and other stuff
PROJECT_NAME=sepraps

# Base directory for the whole project. Helper folders and repos are inside
PROJECT_ROOT_PATH=~/development/sepraps

# The last deployed  version
VERSION=$(date +%y%m%d) # like 220315
```

# Git Structure

-   back: Django REST API + Django Admin
-   front: React SPA frontend
-   scripts: For install, deploy, ... scripts-to-rule-them-all style
-   db: For sqitch
-   tools: For utilities, wrangling data and so on, ...
-   docs
-   server: Provisioning for Vagrant (development) and VPS (production)

## Branches and Tags

-   `main`. principal branch. Code deployed in production. Only maintainers push here.
-   `development`. PR and development goes here. Only maintainers push here. Start your feature branch from here. After a feature is tested in staging is integrated here. Commits can be rewrited with `rebase -i` before the push
-   `staging`. Code deployed in staging (pre production). This branch can be rewrited with `push -f` and `rebase -i`.
-   `<xxxx>_<feature>`. Feature branches started from `development`. Can be rewrited with `push -f` and `rebase -i`

Each new deployed version should be tagged with `"${VERSION}"`

### Git Workflow for developing a feature

When you start a new feature.

```shell
git branch -D staging
# git branch -D <other_branches_not_needed>
git pull --rebase
git pull --rebase origin main
git pull --rebase origin development
git remote prune origin

git co development
git co -b <xxxx>_<feature>

# Work on you branch, and before push

git branch -D staging
# git branch -D <other_branches_not_needed>
git pull --rebase
git pull --rebase origin main
git pull --rebase origin development
git remote prune origin

git co <xxxx>_<feature>
git rebase development

git push origin -u <xxxx>_<feature>
```

Remember that if someone pushes also to `<xxxx>_<feature>` you must rebase also this changes

```
git pull --rebase origin <xxxx>_<feature>
```

## Pre Commit

The project is setup by default with strict linters and formatters that run on pre commit. But sometimes a quick fix is needed and you want to go over the linters. Use `git commit --no-verify` or set it to `[manual]` in `.pre-commit-config.yaml`.

# Pre-Requisites

Check `server/bootstrap.sh` for automatized way of configuring the tools.

-   [VirtualBox and Vagrant](https://gitlab.com/icarto/ikdb/blob/master/configurar_equipo/linux/virtualbox_y_vagrant.md)
-   [nodejs y npm](https://gitlab.com/icarto/ikdb/blob/master/configurar_equipo/linux/instalar_y_actualizar_node_y_npm.md)
-   [Virtualenwrapper](https://gitlab.com/icarto/ikdb/-/blob/master/python/python_tooling_virtualenvwrapper.md#instalaci%C3%B3n)
-   [pyenv](https://gitlab.com/icarto/ikdb/-/blob/master/python/python_tooling_pyenv.md#instalaci%C3%B3n)
-   [shfmt](https://gitlab.com/icarto/ikdb/-/blob/wip_linters/linters_estilo_codigo_y_formatters/estilo_codigo_y_formatters/herramientas/formatters_bash.md#configuraci%C3%B3n-icarto)
-   [shellcheck](https://gitlab.com/icarto/ikdb/-/blob/wip_linters/linters_estilo_codigo_y_formatters/linters/5.linters_bash.md#configuraci%C3%B3n-icarto)

This pre-requistes should be installed previous to the current user session. So if this is the first time you are installing it, _Log out_ from the host and _Log in_ again.

Remember to keep the used ports open and unused: `3000`, `5432`, `8000`, `8080`.

```shell
sudo lsof -i -P -n | grep LISTEN
```

_Note_: Probably, you can avoid install things in your host accessing the Vagrant guess as it should contain all the dependencies. So you can even launch the back/front inside the Vagrant just opening the appropriate ports. But, this workflow was not tested.

# First Time and Each Development Phase

Most of the Development Environment setup can be done with scripts in Ubuntu 20.04. But some of then mess up with your operating system config files and ask for `sudo` access. So carefully review what is being done.

A production like environment is setup with Vagrant.

We strongly recommend follow this steps before each "development phase" to ensure that the latest dependencies have been upgraded.

Check the [recap](#recap) section for the commands

## Restore fixtures/development database

Use the script

```shell
./scripts/reset_db_and_create.sh empty
```

# Development

The common workflow:

```shell
workon "${PROJECT_NAME}"
code . # or your favourite IDE
./scripts/start.sh
```

Instead of `start.sh` script you can open two consoles:

```shell
# Launch back
workon "${PROJECT_NAME}"
cd back; python manage.py runserver_plus

# Lauch front
cd front; npm start
```

# Deployment

```shell
workon "${PROJECT_NAME}"
# ./scripts/pre-deploy.sh
./scripts/deploy.sh
```

# Automated Test

Launch all tests with `./scripts/test.sh`. Take care that this includes e2e tests and can be pretty slow.

# Test in a production like environment

NOT READY YET

```shell
vagrant ssh
workon "${PROJECT_NAME}"
./scripts/deploy.sh
```

# Recap

After installing the pre-requisites.

## First time only

```shell
cd "${PROJECT_ROOT_PATH}"
git clone git@gitlab.com:icarto-private/sepraps.git
```

## Each development phase

```shell
git branch -D staging
# git branch -D <other_branches_not_needed>
git pull --rebase
git pull --rebase origin main
git pull --rebase origin development
git remote prune origin

git co development

# Clean up
source server/variables.ini
vagrant destroy
rmvirtualenv "${PROJECT_NAME}"

vagrant up
vagrant halt
vagrant up

# Set up the dependencies
./scripts/install.sh

# Download fixture/test databases
# Use --dir if recommended folder hierarchy is not followed
./scripts/reset_and_create_db.sh

deactivate

workon "${PROJECT_NAME}"

./scripts/test.sh
```
