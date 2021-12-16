#!/bin/bash
# shellcheck disable=SC2034

EX_OK=0     # successful termination

#
# user-defined exit codes should use the range 79 - 113
#
EX_FILE=79  # File or Folder does not exist
EX_PARAM=80 # Bad or missing parameter for a command or script

#
# # https://brandur.org/exit-status
#

# base value for error messages
EX__BASE=64
# command line usage error
EX_USAGE=64
# data format error
EX_DATAERR=65
# cannot open input
EX_NOINPUT=66
# addressee unknown
EX_NOUSER=67
# host name unknown
EX_NOHOST=68
# service unavailable
EX_UNAVAILABLE=69
# internal software error
EX_SOFTWARE=70
# system error (e.g., can't fork)
EX_OSERR=71
# critical OS file missing
EX_OSFILE=72
# can't create (user) output file
EX_CANTCREAT=73
# input/output error
EX_IOERR=74
# temp failure; user is invited to retry
EX_TEMPFAIL=75
# remote error in protocol
EX_PROTOCOL=76
# permission denied
EX_NOPERM=77
# configuration error
EX_CONFIG=78

# maximum listed value
EX__MAX=78

#
# http://tldp.org/LDP/abs/html/exitcodes.html
#

# Catchall for general errors.
# Example: `let "var1 = 1/0"`.
# Miscellaneous errors, such as "divide by zero" and other impermissible operations
EX_1=1

# Misuse of shell builtins (according to Bash documentation).
# Example: `empty_function() {}`.
# Missing keyword or command, or permission problem (and diff return code on a failed binary file comparison).
EX_2=2

# Command invoked cannot execute
# Example: `/dev/null`
# Permission problem or command is not an executable
EX_126=126

# "command not found"
# Example: `illegal_command`
# Possible problem with $PATH or a typo
EX_127=127

# Invalid argument to exit
# Example: `exit 3.14159`
# exit takes only integer args in the range 0 - 255 (see first footnote)
EX_128=128

# Fatal error signal "n"
# Example: `kill -9 $PPID of script`
# $? returns 137 (128 + 9)
#EX_128N=128+n

# Script terminated by Control-C
# Example: `Ctl-C`
# Control-C is fatal error signal 2, (130 = 128 + 2, see above)
EX_130=130

# Exit status out of range
# Example: `exit -1`
# exit takes only integer args in the range 0 - 255
# EX_255=255*
