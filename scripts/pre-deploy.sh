#!/bin/bash

set -e

bash test.sh

bash create_notice.sh ./NOTICE 'bid-sepraps-web'
