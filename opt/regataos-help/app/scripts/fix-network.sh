#!/bin/sh

# Get the translated text
getTranslationFile="$(/opt/regataos-help/app/scripts/choose-translation start)"
title="$(cat $getTranslationFile | grep fixNetwork= | cut -d"=" -f 2- | sed 's/"//g')"
text1="$(cat $getTranslationFile | grep searchingDriverDesc= | cut -d"=" -f 2- | sed 's/"//g')"
text2="$(cat $getTranslationFile | grep fixNetworkDesc= | cut -d"=" -f 2- | sed 's/"//g')"

# Checking driver...
(
    sudo /opt/regataos-help/app/scripts/install-driver-wireless.sh start
    sleep 5
) | sudo -H env DISPLAY=:0 zenity --progress --pulsate --width 350 \
    --text "$text1" --title "$title" --auto-close --auto-kill --no-cancel \
    --window-icon "/usr/share/icons/breeze-dark/categories/32/applications-network.svg"

# Resetting config files...
(
    sleep 5
    sudo rm -f /etc/resolv.conf
    sudo rm -f /etc/resolv.conf.netconfig

    sudo systemctl stop network.service
    sudo systemctl --force enable NetworkManager.service
    sudo systemctl restart network.service
) | sudo -H env DISPLAY=:0 zenity --progress --pulsate --width 350 \
    --text "$text2" --title "$title" --auto-close --auto-kill --no-cancel \
    --window-icon "/usr/share/icons/breeze-dark/categories/32/applications-network.svg"
