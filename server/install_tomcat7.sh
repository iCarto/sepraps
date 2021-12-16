#!/bin/bash
# http://tecadmin.net/install-tomcat-7-on-ubuntu/
# https://askubuntu.com/questions/339169/how-to-install-tomcat-7-0-42-on-ubuntu-12-04-3-lts

source variables.ini

apt-get remove -y --purge tomcat6
rm -rf /usr/share/tomcat6

apt-get install -y tomcat7
mkdir -p /etc/.java/.systemPrefs/

MY_PATH="/etc/.java/"
# sudo chown -R tomcat7:tomcat7 "${MY_PATH}" # TO BE INVESTIGATED
sudo find "${MY_PATH}" -type d -exec chmod 751 {} \;
sudo find "${MY_PATH}" -type f -exec chmod 644 {} \;
