## On the development machine or CI/CD enviroment

Script `deploy.sh` creates all the needed "deploy files" on each call, and puts it on `"/tmp/${TODAY}_${PROJECT_NAME}_deploy"`:

-   `${TODAY}_${PROJECT_NAME}_server_scripts.tar.gz`. Provision scripts to be upload and executed on the server
-   `${PROJECT_NAME}-x.y.z.tar.gz`. pip instalable package of the web application
-   `${TODAY}_${PROJECT_NAME}.dump`. Full dump of the current `${PROJECT_NAME}` database on the machine. This dump could be used if needed to replace the existent in prod
-   `${TODAY}_media_${PROJECT_NAME}.tar.gz`. A .tar.gz with the contents of `back/media`. These files could be used if needed to replace the existent in prod
-   `${TODAY}_${PROJECT_NAME}.sql`. NOT READY JET. SQL script to migrate from one version of the app to another

```bash
# Si un dump completo es necesario, crear una base de datos local "${PROJECT_NAME}" con el contenido adecuado
# Si la carpeta media es necesaria prepararla en "back/media"
./scripts/deploy.sh
```

## On Production or Staging servers

Upload to the server the "deploy files". And then:

```bash
sudo su
tar xzvf yymmdd_${PROJECT_NAME}_server_scripts.tar.gz
cd yymmdd_${PROJECT_NAME}_server_scripts
# Edit first_time_deploy.sh
bash first_time_deploy.sh
```

## Deploy from repo

To deploy from the repo use:

```shell
workon "${PROJECT_NAME}"
./scripts/deploy_from_repo.sh <BRANCH_TO_DEPLOY>
```
