#!/bin/bash
set -e

this_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null && pwd)"

source "${this_dir}"/env.sh
source "${this_dir}"/../../server/variables.ini
cd "${this_dir}"/../..

# build the frontend
(
    cd "${FRONTEND_FOLDER_NAME}"
    npm install
    npm run build
)

# clean out files
mkdir -p prod
if [[ -d ./prod/.git ]]; then
    (
        cd prod
        git rm -rf .
        git clean -fxd
    )
else
    (rm -rf ./prod/*)
fi

# copy all of the backend and only the build frontend
rsync -avm \
    --include="${FRONTEND_FOLDER_NAME}"/build \
    --exclude-from=./.gitignore \
    --exclude=.git \
    --exclude="${PROJECT_NAME}"/static \
    --exclude=scripts \
    --exclude="${FRONTEND_FOLDER_NAME}/*" \
    . prod

# move the frontend to its place
mv "prod/${FRONTEND_FOLDER_NAME}/build" "prod/${PROJECT_NAME}/static"
rmdir "prod/${FRONTEND_FOLDER_NAME}"

# add a production gitignore
cp ./scripts/util/prod-gitignore prod/.gitignore
