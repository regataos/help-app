#!/bin/sh

# Get the translated text
getTranslationFile="$(/opt/regataos-help/scripts/choose-translation start)"
title="$(cat $getTranslationFile | grep fixNetwork= | cut -d"=" -f 2- | sed 's/"//g')"
text="$(cat $getTranslationFile | grep fixNetworkDesc= | cut -d"=" -f 2- | sed 's/"//g')"

# Running Commands
(
sudo rm -f /etc/resolv.conf
sudo rm -f /etc/resolv.conf.netconfig

sudo systemctl stop network.service
sudo systemctl --force enable NetworkManager.service
sudo systemctl restart network.service
sleep 5
) | sudo -H env DISPLAY=:0 zenity --progress --pulsate --width 350 \
    --text "$text" --title "$title" --auto-close --auto-kill --no-cancel \
    --window-icon "/usr/share/icons/breeze-dark/categories/32/applications-network.svg"
