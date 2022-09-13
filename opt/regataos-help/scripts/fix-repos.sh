#!/bin/sh

# Get the translated text
getTranslationFile="$(/opt/regataos-help/scripts/choose-translation start)"
title="$(cat $getTranslationFile | grep updatingRepo= | cut -d"=" -f 2- | sed 's/"//g')"
text1="$(cat $getTranslationFile | grep downFiles= | cut -d"=" -f 2- | sed 's/"//g')"
text2="$(cat $getTranslationFile | grep upRepoManually= | cut -d"=" -f 2- | sed 's/"//g')"

# Download files
wget --no-check-certificate -O /tmp/apps-scripts/regataos-repo-22.tar.xz \
	https://master.dl.sourceforge.net/project/regataos/repos/regataos-repo-22.tar.xz 2>&1 \
    | sudo -H env DISPLAY=:0 zenity --progress --pulsate --width 350 --text \
    "$text1" --title "$title" --auto-close --auto-kill --no-cancel \
    --window-icon "/usr/share/icons/breeze-dark/preferences/32/yast-sw_source.svg"

# Extract files
sudo tar xf /tmp/apps-scripts/regataos-repo-22.tar.xz -C /

sudo pkcon --noninteractive refresh | sudo -H env DISPLAY=:0 zenity --progress --pulsate --width 350 \
    --text "$text2" --title "$title" --auto-close --auto-kill --no-cancel \
    --window-icon "/usr/share/icons/breeze-dark/preferences/32/yast-sw_source.svg"

# Clear
sudo rm -f /tmp/apps-scripts/regataos-repo-*.tar.xz
echo fixrepos > /tmp/apps-scripts/fix-repos.txt
