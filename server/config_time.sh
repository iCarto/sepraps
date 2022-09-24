#!/bin/bash

set -e

source variables.ini

# https://www.tecmint.com/set-time-timezone-and-synchronize-time-using-timedatectl-command/
# https://coreos.com/os/docs/latest/configuring-date-and-timezone.html
timedatectl set-local-rtc 0
# timedatectl set-ntp true
timedatectl set-timezone "${MY_TIMEZONE}"
