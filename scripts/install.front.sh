#!/bin/bash

# create the .env file
if [[ ! -f front/.env ]]; then
    echo "* creating initial .env file"
    echo "REACT_APP_API_BASE_URL=http://localhost:8000
REACT_APP_API_CREDENTIALS=omit
REACT_APP_GOOGLE_ANALYTICS_CODE=
REACT_APP_SENTRY_DSN=
" > front/.env

else
    echo "* front/.env file already exists"
fi

# FIXME. Something to do here? Probably not.
if [[ ! -d front ]]; then
    create-react-app front
fi
# build the frontend
(
    cd front || exit
    npm install
)
