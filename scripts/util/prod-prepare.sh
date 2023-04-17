#!/bin/bash
set -e

this_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null && pwd)"

source "${this_dir}"/../../server/variables.ini
cd "${this_dir}"/../..

# TODO: only if remote doesn't have the prod branch
mkdir -p prod
cd prod
git init
if [[ -n "${GIT_REPO}" ]]; then
    git remote add origin "${GIT_REPO}"
fi
git checkout -b prod
echo "# The production branch" > README.md
git add -A
git commit -m "initial commit"
if [[ -n "${GIT_REPO}" ]]; then
    git push -u origin prod
fi
cd ..
