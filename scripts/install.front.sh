#/bin/bash

# FIXME. Something to do here? Probably not.
if [[ ! -d front ]]; then
    create-react-app front
fi
# build the frontend
(
    cd front
    npm install
)
