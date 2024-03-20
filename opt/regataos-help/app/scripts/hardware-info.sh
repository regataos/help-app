#!/bin/bash
#
# Script that helps to collect hardware information.

# Get the translated text
getTranslationFile="$(/opt/regataos-help/app/scripts/choose-translation start)"
title="$(cat $getTranslationFile | grep hardwareInfo= | cut -d"=" -f 2- | sed 's/"//g')"
text="$(cat $getTranslationFile | grep collectingHardwareInfo= | cut -d"=" -f 2- | sed 's/"//g')"

(
# Detect username
user=$(users | awk '{print $1}')

# Complete hardware information
echo " [ Hardware information ] " > /home/$user/hardware-info.txt
echo "" >> /home/$user/hardware-info.txt
hwinfo --short >> /home/$user/hardware-info.txt
echo "" >> /home/$user/hardware-info.txt

# Network adapter information
echo "" >> /home/$user/hardware-info.txt
echo " [ Network adapter information ] " >> /home/$user/hardware-info.txt
echo "" >> /home/$user/hardware-info.txt
lspci | egrep -i 'network|ethernet' >> /home/$user/hardware-info.txt
echo "" >> /home/$user/hardware-info.txt
echo "" >> /home/$user/hardware-info.txt
lshw -class network >> /home/$user/hardware-info.txt
echo "" >> /home/$user/hardware-info.txt

# Audio device information
echo "" >> /home/$user/hardware-info.txt
echo " [ Audio device information ] " >> /home/$user/hardware-info.txt
echo "" >> /home/$user/hardware-info.txt
lspci | grep Audio >> /home/$user/hardware-info.txt
echo "" >> /home/$user/hardware-info.txt

# RAM and SWAP information
echo "" >> /home/$user/hardware-info.txt
echo " [ RAM and SWAP information ] " >> /home/$user/hardware-info.txt
echo "" >> /home/$user/hardware-info.txt
free -h >> /home/$user/hardware-info.txt
echo "" >> /home/$user/hardware-info.txt
) | sudo -H env DISPLAY=:0 zenity --progress --pulsate --width 350 \
    --window-icon "/usr/share/icons/breeze-dark/apps/32/hwinfo.svg" --text "$text" \
    --title "$title" --auto-close --auto-kill --no-cancel --icon-name=hwinfo
