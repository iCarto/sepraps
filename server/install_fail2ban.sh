#!/bin/bash

# set -e: stops the script on error
# set -u: stops the script on unset variables
# set -o pipefail:  fail the whole pipeline on first error
set -eu

# The script bypasses jail.conf/jail.local configuration creating custom configuration files inside the jail.d for default 
# options like mail or actions, and for Apache and SSHD Jails 

# Config files
FILE_DEF=/etc/fail2ban/jail.d/defaults-debian # Change to the distribution defaults configuration file (e.g. defaults-arch,...)
FILE_SSH=/etc/fail2ban/jail.d/sshd.local
FILE_APACHE=/etc/fail2ban/jail.d/apache.local
FILE_F2B="/etc/fail2ban/jail"

# Enabled filters, select the ones you would like to use
SSHD_ENABLE=true # Enabled by default. Bans hosts with multiple failed login attempts

APACHE_AUTH_ENABLE=false          # Bans hosts with multiple failed login attempts
APACHE_BADBOTS_ENABLE=false       # Stops some known malicious bot request patterns
APACHE_BOTSEARCH_ENABLE=false     # Blocks hosts trying to access non-existent URL's
APACHE_FAKEGOOGLEBOT_ENABLE=false # Filters fake Googlebot User Agents (https://johnmu.com/fake-googlebots/)
APACHE_OVERFLOWS_ENABLE=false     # Blocks clients who are attempting to request unusually long and suspicious URLs
APACHE_SHELLSHOCK_ENABLE=false    # Blocks Shellshock exploit attempts (https://blog.cloudflare.com/inside-shellshock/)
APACHE_MODSECURITY_ENABLE=false   # Bans hosts based on Apache's security module log errors
APACHE_NOHOME_ENABLE=false        # Can be enabled if you do not use Apache to provide access to web content within 
                                  # users’ home directories
APACHE_NOSCRIPT_ENABLE=false      # Bans clients searching for scripts on the website to execute and exploit. If you do
                                  # not use PHP or any other language in your web server, you can enable this jail
APACHE_PASS_ENABLE=false          #

# Path to services' LOG files
SSHD_ERROR_LOG="/var/log/auth.log"
APACHE_ERROR_LOG="/var/log/apache2/*error.log"
APACHE_ACCESS_LOG="/var/log/apache2/*access.log"


# Service configuration 'man jail.conf' to get more info

# IgnoreIP
IGNORE="" # Hosts to be ignored

# Mail
MAIL_MTA="sendmail"             # "postfix, mailx ..."
MAIL_SENDER="dev@icarto.es"    
MAIL_SENDERNAME="Fail2ban"
MAIL_DESTEMAIL="dev@icarto.es"

DEFAULT_BANTIME="10m" # Time the host gets banned 
DEFAULT_MAXRETRY=5 # number of errors resulting in a ban
DEFAULT_FINDTIME="10m" # if host reachs maxretry in findtime gets banned

DEFAULT_ACTION="%(action_mw)s" # action=%(action_)s, To ban reported host
                               # action=%(action_mw)s, To ban & send an e-mail with whois report to the destemail.
                               # action=%(action_mwl)s, Same as action_mw but also send relevant log lines.

remove_configuration() {
    if [ -f "$FILE_DEF.conf" ]; then
        rm "$FILE_DEF.conf"
        touch "$FILE_DEF.conf"
    fi

    if [ -f "$FILE_SSH" ]; then
        rm "$FILE_SSH"
    fi

    if [ -f "$FILE_APACHE" ]; then
        rm "$FILE_APACHE"
    fi
}

default_configuration() {
    remove_configuration

    # Generate local configuration, only to avoid config changes on service updates
    cp "$FILE_F2B.conf" "$FILE_F2B.local"

    # Write configuration to default distribution config file
    echo "[DEFAULT]\nignoreip=127.0.0.1/8 $IGNORE\n" >> "$FILE_DEF.local" # Configure ignoreIP

    # Configure mail
    echo "mta=$MAIL_MTA\nsender=$MAIL_SENDER\nsendername=$MAIL_SENDERNAME\ndestemail=$MAIL_DESTEMAIL\naction=$DEFAULT_ACTION\nbantime=$DEFAULT_BANTIME\nmaxretry=$DEFAULT_MAXRETRY\nfindtime=$DEFAULT_FINDTIME\n\n" >> "$FILE_DEF.local"

}

sshd_configuration() {
    # Generate SSH configuration
    if "$SSHD_ENABLE"; then
        echo "[sshd]\nenabled=true\nlogpath=$SSHD_ERROR_LOG\n" >> "$FILE_SSH"
    fi
}

Apache_configuration() {
    # Generate Apache configuration
    if "$APACHE_AUTH_ENABLE"; then
        echo "[apache-auth]\nenabled=true\nlogpath=$APACHE_ERROR_LOG\n" >> "$FILE_APACHE"
    fi

    if "$APACHE_BADBOTS_ENABLE"; then
        echo "[apache-badbots]\nenabled=true\nlogpath=$APACHE_ACCESS_LOG\n" >> "$FILE_APACHE"
    fi

    if "$APACHE_BOTSEARCH_ENABLE"; then
        echo "[apache-botsearch]\nenabled=true\nlogpath=$APACHE_ERROR_LOG\n" >> "$FILE_APACHE"
    fi

    if "$APACHE_FAKEGOOGLEBOT_ENABLE"; then
        echo "[apache-fakegooglebot]\nenabled=true\nlogpath=$APACHE_ACCESS_LOG\n" >> "$FILE_APACHE"
    fi

    if "$APACHE_MODSECURITY_ENABLE"; then
        echo "[apache-modsecurity]\nenabled=true\nlogpath=$APACHE_ERROR_LOG\n" >> "$FILE_APACHE"
    fi

    if "$APACHE_NOHOME_ENABLE"; then
        echo "[apache-nohome]\nenabled=true\nlogpath=$APACHE_ERROR_LOG\n" >> "$FILE_APACHE"
    fi

    if "$APACHE_NOSCRIPT_ENABLE"; then
        echo "[apache-noscript]\nenabled=true\nlogpath=$APACHE_ERROR_LOG\n" >> "$FILE_APACHE"
    fi

    if "$APACHE_OVERFLOWS_ENABLE"; then
        echo "[apache-overflows]\nenabled=true\nlogpath=$APACHE_ERROR_LOG\n" >> "$FILE_APACHE"
    fi

    if "$APACHE_PASS_ENABLE"; then
        echo "[apache-pass]\nenabled=true\nlogpath=$APACHE_ERROR_LOG\n" >> "$FILE_APACHE"
    fi

    if "$APACHE_SHELLSHOCK_ENABLE"; then
        echo "[apache-shellshock]\nenabled=true\nlogpath=$APACHE_ERROR_LOG\n" >> "$FILE_APACHE"
    fi
}

# Install fail2ban
apt -y install fail2ban

# Configure service
default_configuration
sshd_configuration
Apache_configuration

# Restart service
systemctl enable fail2ban
systemctl start fail2ban
