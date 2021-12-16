#!/bin/bash

# A veces saltan errores de grub al hacer un upgrade dentro del Vagrant que
# hace que se interrumpa la instalación;
#
# default: Setting up grub-pc (2.02-2ubuntu8.17) ...
# default: Error: Only one of force_conffold and force_conffnew should
# default:        be set
# default: dpkg: error processing package grub-pc (--configure):
# default:
# default:  installed grub-pc package post-installation script subprocess returned error exit status 1
# ...
# default: Errors were encountered while processing:
# default:  grub-pc
# https://github.com/hashicorp/vagrant/issues/289
# https://github.com/chef/bento/issues/661
# https://askubuntu.com/questions/146921/how-do-i-apt-get-y-dist-upgrade-without-a-grub-config-prompt
# https://serverfault.com/questions/310488/unattended-grub-pc-update
# https://askubuntu.com/questions/194651/why-use-apt-get-upgrade-instead-of-apt-get-dist-upgrade
apt-get update

DEBIAN_FRONTEND=noninteractive apt-get -y -o Dpkg::Options::="--force-confdef" -o Dpkg::Options::="--force-confold" upgrade

apt-get autoremove -y
apt-get autoclean -y
