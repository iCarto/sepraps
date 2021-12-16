#!/bin/bash

sed -e '/SendEnv/ s/^#*/#/' -i /etc/ssh/ssh_config
sed -e '/AcceptEnv/ s/^#*/#/' -i /etc/ssh/sshd_config
